import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FaSearch, FaTimes, FaCheck, FaArrowRight } from 'react-icons/fa';
import { db } from '../Services/Firebase';
import { useAuth } from '../Context/AuthContext';
import ProfileIcon from '../assets/Icons SVG/Profile.svg';
import TermsConditionIcon from '../assets/Icons SVG/Terms_Conditions.svg';
import TransactionHistoryIcon from '../assets/Icons SVG/Transaction_History.svg';
import SupportIcon from '../assets/Icons SVG/Support.svg';
import AboutUsIcon from '../assets/Icons SVG/Aboutus.svg';
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

  const { currentUser } = useAuth();
  const [Author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setprofile] = useState(false);


  const handleProfile = () => {
    setprofile(!profile);
  }

  const fetchAuthor = async () => {
    if (currentUser?.uid) {
      try {
        const userQuery = query(
          collection(db, 'userCollection'),
          where('docID', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(userQuery);
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (userData.length > 0) {
          setAuthor(userData[0]);
        } else {
          setAuthor(null);
        }
      } catch (err) {
        console.error('Error fetching author:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [currentUser?.uid]);
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

  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setprofile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
  const activeIconFilter = 'invert(32%) sepia(80%) saturate(462%) hue-rotate(169deg) brightness(94%) contrast(101%)';

  console.log("Author", Author);
  console.log("Current user", currentUser);
  return (
    <>
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
                          onClick={(e) => removeRecentSearch(e, user.id)

                          }
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
            <FaArrowRight className="w-5 h-5 text-white" onClick={() => { setSearch(false) }} />
          </button>
        )}
      </div>

      {
        <div className='relative'
          ref={profileRef}
        >
          {
            currentUser && (
              <>
                {loading ? (
                  <div className={`w-12 h-12 bg-gray-100 rounded-full animate-pulse hidden md:block `}></div>
                ) : (
                  Author?.image ? (
                    <img
                      src={Author.image}
                      alt="Author"
                      className="w-12 cursor-pointer max-h-12 rounded-full object-cover"
                      onClick={() => handleProfile()}
                    />

                  ) : (
                    <div onClick={() => handleProfile()} className="w-12 h-12 relative bg-gray-100 rounded-full"></div>
                  )
                )}

                {
                  profile && (
                    <div className='absolute top-14 right-0 bg-white rounded-lg shadow-lg py-2 w-auto min-w-[250px] z-50'>
                      <div className='m-3'>
                        {loading ? (
                          <div className={`w-12 h-12 bg-gray-100 rounded-full animate-pulse hidden md:block `}></div>
                        ) : (
                          Author?.image ? (
                            <div className='flex gap-2 '>
                              <img
                                src={Author.image}
                                alt="Author"
                                className="w-16 cursor-pointer max-h-16 rounded-full object-cover"
                                onClick={() => handleProfile()}
                              />
                              <div className='mt-1'>
                                <h1 className='font-bold text-lg'>{Author.firstName}</h1>
                                <p className='text-gray-400'>{Author.categoryName}</p>
                              </div>
                            </div>

                          ) : (
                            <div onClick={() => handleProfile()} className="w-16 h-16 relative bg-gray-100 rounded-full"></div>
                          )
                        )}
                        <ul className='border-t mt-2 border-gray-300 '>
                          <div className={`flex flex-col gap-2 `}>
                            {/* Profile Link */}
                            <li>
                              <NavLink
                                to='/profile'
                                className={({ isActive }) =>
                                  `flex items-center  gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <img
                                      src={ProfileIcon}
                                      alt="Profile"
                                      style={{ filter: isActive ? activeIconFilter : '' }}
                                      className='w-6 h-6 mb-1'
                                    />
                                    My Profile
                                  </>
                                )}
                              </NavLink>
                            </li>
                            {/* Transactions Link */}
                            <li>
                              <NavLink
                                to='/transaction'
                                className={({ isActive }) =>
                                  `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <img
                                      src={TransactionHistoryIcon}
                                      alt="Transactions"
                                      style={{ filter: isActive ? activeIconFilter : '' }}
                                      className='w-6 h-6 mb-1'
                                    />
                                    Transactions
                                  </>
                                )}
                              </NavLink>
                            </li>
                            {/* Support Link */}
                            <li>
                              <NavLink
                                to='/support'
                                className={({ isActive }) =>
                                  `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <img
                                      src={SupportIcon}
                                      alt="Support"
                                      style={{ filter: isActive ? activeIconFilter : '' }}
                                      className='w-6 h-6 mb-1'
                                    />
                                    Support
                                  </>
                                )}
                              </NavLink>
                            </li>
                            {/* About Us Link */}
                            <li>
                              <NavLink
                                to='/about'
                                className={({ isActive }) =>
                                  `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <img
                                      src={AboutUsIcon}
                                      alt="About Us"
                                      style={{ filter: isActive ? activeIconFilter : '' }}
                                      className='w-6 h-6 mb-1'
                                    />
                                    About Us
                                  </>
                                )}
                              </NavLink>
                            </li>
                            {/* Terms & Conditions Link */}
                            <li>
                              <NavLink
                                to='/term-policy'
                                className={({ isActive }) =>
                                  `flex items-center tracking-tight gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <img
                                      src={TermsConditionIcon}
                                      alt="Terms & Conditions"
                                      style={{ filter: isActive ? activeIconFilter : '' }}
                                      className='w-6 h-6 mb-1'
                                    />
                                    Terms & Conditions
                                  </>
                                )}
                              </NavLink>
                            </li>
                            {/* Privacy Policy Link */}
                            <li>
                              <NavLink
                                to='/privacy'
                                className={({ isActive }) =>
                                  `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-[#E7F3FE] font-bold text-[#227BCD] text-lg' : 'text-lg hover:bg-gray-200'}`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <img
                                      src={TermsConditionIcon} // Assuming you want a different icon
                                      alt="Privacy Policy"
                                      style={{ filter: isActive ? activeIconFilter : '' }}
                                      className='w-6 h-6 mb-1'
                                    />
                                    Privacy Policy
                                  </>
                                )}
                              </NavLink>
                            </li>
                          </div>
                        </ul>

                      </div>
                    </div>
                  )
                }
              </>
            )
          }
        </div>
      }


    </>
  );
};

export default SearchBar;