import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Add useSearchParams
import Loader from '../components/Loader/Loader';
import NoData from '../components/Loader/NoData';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categoryCollection'));
        const categoryData = querySnapshot.docs.map(doc => ({
          docID: doc.id,
          ...doc.data(),
        }));
        const sortedCategories = categoryData.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sortedCategories);

        // Get the search query from URL params
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
  }, [searchParams]); // Add searchParams as dependency

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    // Update URL search params
    if (query.trim()) {
      setSearchParams({ q: query });
      const sortedFilteredCategories = categories
        .filter((category) => category.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredCategories(sortedFilteredCategories);
      setHasSearched(true);
    } else {
      setSearchParams({}); // Remove query param when search is empty
      setFilteredCategories(categories);
      setHasSearched(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams({}); // Clear URL params
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

  return (
    <div className="bg-gray-100">
      <div className="p-8 font-sans bg-white mr-1 ml-1">
        <div className='border-b-2 border-gray-300'>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-7">Categories</h2>
        </div>
        <div
          ref={searchRef}
          className="relative flex mt-5 border-gray-100 border justify-end items-center md:bg-[#ECF5FE] rounded-3xl px-3 md:py-2 py-3 space-x-2"
        >
          <FaSearch className="w-6 h-6 cursor-pointer" />
          <input
            type="search"
            placeholder="Search by category name..."
            value={searchTerm}
            onChange={handleSearchInput}
            className="outline-none flex bg-transparent rounded px-2 py-1 w-full"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="min-w-9 h-9 bg-black rounded-full cursor-pointer flex items-center justify-center"
            >
              <FaTimes className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {!hasSearched && categories.length === 0 && <NoData />}

        {hasSearched && filteredCategories.length === 0 && (
          <div className="w-full"><NoData /></div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

          {filteredCategories.map((category) => (
            <div
              key={category.docID}
              onClick={() => handleCategoryClick(category.name)}
              className="cursor-pointer bg-[#ECF5FE] p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">{category.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {highlightText(category.name, searchTerm)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;