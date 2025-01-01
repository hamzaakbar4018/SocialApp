import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../Services/Firebase';

const SearchBar = ({ search, setSearch }) => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load initial recent searches
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing recent searches:', e);
        localStorage.removeItem('recentSearches');
      }
    }
  }, []);

  // Update recent searches when location changes
  useEffect(() => {
    const checkAndUpdateRecent = async () => {
      const match = location.pathname.match(/\/userprofile\/(.+)/);
      if (match && users.length > 0) {
        const userId = match[1];
        const user = users.find(u => (u.docID || u.id) === userId);
        if (user) {
          const updatedSearches = [
            user,
            ...recentSearches.filter(u => u.id !== user.id)
          ].slice(0, 5);
          setRecentSearches(updatedSearches);
          localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
      }
    };
    checkAndUpdateRecent();
  }, [location.pathname, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "userCollection"));
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userData);
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const location = user.city ? `${user.city} ${user.country}`.toLowerCase() : '';
        const searchLower = searchTerm.toLowerCase();
        return fullName.includes(searchLower) || location.includes(searchLower);
      });
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, users]);

  const handleUserSelect = (user) => {
    navigate(`/userprofile/${user.docID || user.id}`);
    const updatedSearches = [
      user,
      ...recentSearches.filter(u => u.id !== user.id)
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setSearch(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setError(null);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
        setSearchTerm('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSearch]);

  // Rest of the component remains the same...
  return (
    <div
      ref={searchRef}
      onClick={() => setSearch(true)}
      className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${
        search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'
      }`}
    >
      <div className={`w-5 h-5 md:w-6 md:h-6 ${isLoading ? 'animate-spin' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="search"
        placeholder="Search by name or city..."
        value={searchTerm}
        onChange={handleSearchInput}
        onClick={() => setSearch(true)}
        className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${
          search ? 'block' : 'hidden md:flex'
        }`}
      />

      {search && (searchResults.length > 0 || error || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-2 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
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
                    <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                    {user.city && (
                      <div className="text-sm text-gray-500">{`${user.city}, ${user.country}`}</div>
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

      {search && (
        <button
          onClick={() => {
            setSearch(false);
            setSearchTerm('');
            setSearchResults([]);
            setError(null);
          }}
          className="min-w-9 h-9 bg-black rounded-full cursor-pointer flex items-center justify-center"
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