import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaTimes, FaCheck, FaArrowRight } from 'react-icons/fa';
import { db } from '../Services/Firebase';

const SearchBar = ({ search, setSearch }) => {
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
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

  const performSearch = () => {
    if (searchTerm.trim()) {
      const filtered = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const location = user.city ? `${user.city} ${user.country}`.toLowerCase() : '';
        const searchLower = searchTerm.toLowerCase();
        return fullName.includes(searchLower) || location.includes(searchLower);
      });
      setSearchResults(filtered);
      setHasSearched(true);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  };

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
    setHasSearched(false);
  };

  const removeRecentSearch = (e, userId) => {
    e.stopPropagation();
    const updatedSearches = recentSearches.filter(user => user.id !== userId);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setError(null);
    if (e.target.value === '') {
      setHasSearched(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
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
        setHasSearched(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSearch]);

  return (
    <div
      ref={searchRef}
      onClick={() => setSearch(true)}
      className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'
        }`}
    >
      <div
        className={`w-5 h-5 md:w-6 md:h-6 ${isLoading ? 'animate-spin' : 'cursor-pointer'}`}
        onClick={performSearch}
      >
        <FaSearch className="w-full h-full" />
      </div>

      <input
        type="search"
        placeholder="Search by name or city..."
        value={searchTerm}
        onChange={handleSearchInput}
        onKeyPress={handleKeyPress}
        onClick={() => setSearch(true)}
        className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${search ? 'block' : 'hidden md:flex'
          }`}
      />

      {search && (searchResults.length > 0 || error || recentSearches.length > 0 || hasSearched) && (
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
                    <FaCheck className="w-5 h-5 text-blue-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          )}
          {!error && hasSearched && searchResults.length === 0 && searchTerm.trim() !== '' && (
            <div className="p-4 text-center text-gray-500">
              <div className="font-medium">No results found</div>
              <div className="text-sm">Try searching with different keywords</div>
            </div>
          )}
          {!error && !hasSearched && searchResults.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-gray-700 font-semibold px-2">Recent Searches</div>
              {recentSearches.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer group"
                >
                  {user.image && (
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className='flex justify-between w-full'>
                    <div>
                      <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                      {user.city && (
                        <div className="text-sm text-gray-500">{`${user.city}, ${user.country}`}</div>
                      )}
                    </div>
                    <div className="ml-auto flex  items-center space-x-2">
                      {user.isVerified && (
                        <FaCheck className="w-5 h-5 text-blue-500" />
                      )}
                      <button
                        onClick={(e) => removeRecentSearch(e, user.id)}
                        className="p-1 hover:bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {search && (
        <button
          onClick={() => {
            setSearchTerm('');
            setSearchResults([]);
            setError(null);
            setHasSearched(false);
            setSearch(false);
          }}
          className="min-w-9 h-9 bg-black rounded-full cursor-pointer flex items-center justify-center"
        >
          <FaArrowRight className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;