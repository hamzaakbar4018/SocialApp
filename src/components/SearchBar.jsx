import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  getDocs
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { db } from '../Services/Firebase';
import reactStringReplace from 'react-string-replace';

const SearchBar = ({ search, setSearch }) => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // New state
  const navigate = useNavigate();

  // Load all users at once and handle search locally
  const getUsers = async () => {
    try {
      const usersRef = collection(db, 'userCollection');
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs.map((doc) => {
        const data = doc.data();
        // Normalize the data to ensure consistent search
        return {
          id: doc.id,
          docID: data.docID || doc.id,
          firstName: (data.firstName || '').trim(),
          lastName: (data.lastName || '').trim(),
          city: (data.city || '').trim(),
          country: data.country || '',
          image: data.image || '',
          isVerified: !!data.isVerified,
          // Optional: Add lowercase fields for better search performance
          firstName_lower: (data.firstName || '').toLowerCase().trim(),
          lastName_lower: (data.lastName || '').toLowerCase().trim(),
          city_lower: (data.city || '').toLowerCase().trim(),
          ...data
        };
      });
      setUsers(usersList);
      console.log("Loaded users:", usersList);
    } catch (err) {
      console.error("Error loading users:", err);
      setError('Failed to load users.');
    } finally {
      setDataLoading(false); // Update loading state
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const normalizeString = (str) => {
    return (str || '').toLowerCase().trim();
  };

  const performSearch = async (value) => {
    const searchValue = normalizeString(value);
    console.log('Performing search with value:', searchValue);

    if (!searchValue || searchValue.length < 2) {
      setSearchResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Search through all loaded users
      const results = users.filter(user => {
        // Normalize all searchable fields
        const firstName = user.firstName_lower || normalizeString(user.firstName);
        const lastName = user.lastName_lower || normalizeString(user.lastName);
        const city = user.city_lower || normalizeString(user.city);
        const fullName = `${firstName} ${lastName}`;

        // Check if any field contains the search value
        return firstName.includes(searchValue) || 
               lastName.includes(searchValue) || 
               fullName.includes(searchValue) ||
               city.includes(searchValue);
      });

      console.log("Search results count:", results.length);
      console.log("Search results:", results);

      if (results.length === 0) {
        setError('No results found');
        setSearchResults([]);
      } else {
        setSearchResults(results);
      }

    } catch (err) {
      console.error('Error searching users:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useRef(
    debounce((value) => {
      performSearch(value);
    }, 300)
  ).current;

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError(null);

    if (value.trim().length >= 2) {
      debouncedSearch(value);
    } else {
      debouncedSearch.cancel();
      setSearchResults([]);
      setError(null);
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    const newRecent = [user, ...recentSearches.filter(r => r.id !== user.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    // Use docID for navigation if available, fallback to id
    const navigationId = user.docID || user.id;
    navigate(`/userprofile/${navigationId}`);
    setSearch(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    return reactStringReplace(text, regex, (match, i) => (
      <span key={i} className="bg-yellow-200">
        {match}
      </span>
    ));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSearch]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing recent searches from localStorage:', err);
        localStorage.removeItem('recentSearches');
      }
    }
  }, []);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div
      ref={searchRef}
      className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${
        search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'
      }`}
    >
      {/* Search Icon */}
      <div className={`w-5 h-5 md:w-6 md:h-6 ${isLoading ? 'animate-spin' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Search Input */}
      <input
        type="search"
        placeholder="Search by name or city..."
        value={searchTerm}
        onChange={handleSearchInput}
        onClick={() => setSearch(true)}
        disabled={dataLoading} // Disable while data is loading
        className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${
          search ? 'block' : 'hidden md:flex'
        } ${dataLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Visual feedback
      />

      {/* Results Dropdown */}
      {search && (searchResults.length > 0 || error || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          )}
          {error && (
            <div className="p-4 text-red-500 text-center">{error}</div>
          )}
          {!error && searchResults.length > 0 && (
            <div className="p-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  {user.image && (
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">
                      {highlightText(`${user.firstName} ${user.lastName}`, searchTerm.trim())}
                    </div>
                    {user.city && (
                      <div className="text-sm text-gray-500">
                        {highlightText(`${user.city}, ${user.country}`, searchTerm.trim())}
                      </div>
                    )}
                  </div>
                  {user.isVerified && (
                    <svg className="w-5 h-5 text-blue-500 ml-auto" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
          {!error && searchResults.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-gray-700 font-semibold px-2">Recent Searches</div>
              {recentSearches.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  {user.image && (
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">
                      {highlightText(`${user.firstName} ${user.lastName}`, searchTerm.trim())}
                    </div>
                    {user.city && (
                      <div className="text-sm text-gray-500">
                        {highlightText(`${user.city}, ${user.country}`, searchTerm.trim())}
                      </div>
                    )}
                  </div>
                  {user.isVerified && (
                    <svg className="w-5 h-5 text-blue-500 ml-auto" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Close Button */}
      {search && (
        <button
          onClick={() => {
            setSearch(false);
            setSearchTerm('');
            setSearchResults([]);
            setError(null);
          }}
          className="w-9 h-9 bg-black rounded-full cursor-pointer flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
