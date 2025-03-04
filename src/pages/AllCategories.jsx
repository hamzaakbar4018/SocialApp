import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import NoData from '../components/Loader/NoData';
import { useAuth } from '../Context/AuthContext';
import { IoArrowBack } from "react-icons/io5";
const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categoryCollection'));
        const categoryData = querySnapshot.docs.map(doc => ({
          docID: doc.id,
          ...doc.data(),
        }));
        const validCategories = categoryData.filter(category =>
          category && category.name && typeof category.name === 'string'
        );

        // Now sort the filtered categories
        const sortedCategories = validCategories.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCategories(sortedCategories);
        const queryParam = searchParams.get('q');
        if (queryParam) {
          setSearchTerm(queryParam);
          const filtered = sortedCategories.filter((category) =>
            category.name.toLowerCase().includes(queryParam.toLowerCase())
          );
          setFilteredCategories(filtered);
          setHasSearched(true);
        } else {
          setFilteredCategories(sortedCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [searchParams]);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim()) {
      setSearchParams({ q: query });
      const sortedFilteredCategories = categories
        .filter((category) => category.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredCategories(sortedFilteredCategories);
      setHasSearched(true);
    } else {
      setSearchParams({});
      setFilteredCategories(categories);
      setHasSearched(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams({});
    setFilteredCategories(categories);
    setHasSearched(false);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/users/${categoryName}`);
  };

  if (loading) return <Loader />;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 relative">
      <div className="md:p-8 font-sans bg-white mr-1 ml-1">
        <div className='relative border-b-2 border-gray-300 items-center flex justify-center md:justify-between'>
          <h2 className="md:mt-2 mt-5 text-3xl font-bold text-center text-gray-800 mb-7">Categories</h2>
          {
            !currentUser && (
              <div className="cursor-pointer ml-[-30px] mr-4 hidden md:block">
                <Link to="/signup">
                  <button className={`p-3 mr-5 border rounded-3xl border-gray-600 ${currentUser && 'hidden'}`}>SignIn / Signup</button>
                </Link>
              </div>
            )
          }

          <div className='absolute left-0 top-1 mt-6 ml-4 md:hidden'>
            <IoArrowBack className='text-2xl' onClick={handleBackClick}/>
          </div>
        </div>



        <div
          ref={searchRef}
          className="relative md:mt-5 m-1 flex mt-5 border-gray-100 border justify-end items-center md:bg-[#ECF5FE] rounded-3xl px-3 md:py-2 py-3 space-x-2"
        >
          <FaSearch className="w-6 h-6 cursor-pointer" />
          <input
            type="search"
            placeholder="Search by category name..."
            value={searchTerm}
            onChange={handleSearchInput}
            className="outline-none flex bg-transparent rounded px-2 py-1 w-full"
          />
        </div>

        {!hasSearched && categories.length === 0 || hasSearched && filteredCategories.length === 0 ? (
          <div className='min-w-full'>
            <NoData />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6 px-2">
            {filteredCategories.map((category) => (
              <div
                key={category.docID}
                className="mt-4 bg-[#ECF5FE] p-4 rounded-lg shadow-md text-center transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <div className='flex bg-[#ECF5FE] rounded-xl h-auto w-full flex-col items-center'>
                  <div
                    onClick={() => handleCategoryClick(category.name)}
                    className="w-20 h-20 cursor-pointer mb-3 bg-gray-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-lg">{category.name.charAt(0)}</span>
                  </div>

                  <div className='flex flex-col items-center w-full'>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {highlightText(category.name, searchTerm)}
                    </h3>
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className='bg-black text-white w-full p-2 text-sm rounded-full'
                    >
                      View Profiles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategories;