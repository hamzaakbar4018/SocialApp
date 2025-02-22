import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import NoData from '../components/Loader/NoData';
import { useAuth } from '../Context/AuthContext';
const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const carouselRef = useRef(null);
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

  // Carousel scrolling logic
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = carousel.offsetWidth * 0.8;
      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const {currentUser} = useAuth();
  if (loading) return <Loader />;

  return (
    <div className="bg-gray-100 relative">
      <div className="md:p-8 font-sans bg-white mr-1 ml-1">
        <div className='border-b-2 border-gray-300 items-center flex justify-between'>
          <h2 className="md:mt-2 mt-6 text-3xl font-bold text-center text-gray-800 mb-7">Categories</h2>
          {
            !currentUser && (
              <div className="cursor-pointer ml-[-30px] mr-4 hidden md:block">
                <Link to="/signup">
                  <button className={`p-3 mr-5 border rounded-3xl border-gray-600 ${currentUser && 'hidden'}`}>SignIn / Signup</button>
                </Link>
              </div>
            )
          }
          
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
          {/* {searchTerm && (
            <button
              onClick={clearSearch}
              className="min-w-9 h-9 bg-black rounded-full cursor-pointer flex items-center justify-center"
            >
              <FaTimes className="w-5 h-5 text-white" />
            </button>
          )} */}
        </div>

        {/* {!hasSearched && categories.length === 0 && <NoData />}

        {hasSearched && filteredCategories.length === 0 && (
          <div className="w-full"><NoData /></div>
        )} */}

        {/* Carousel Navigation Buttons */}
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute left-2 top-[66%] transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Container */}
        {
          !hasSearched && categories.length === 0 || hasSearched && filteredCategories.length === 0 ?
            (
              <div className='min-w-full'>
                <NoData />
              </div>
            ) : (
              <div
                ref={carouselRef}
                className="carousel flex gap-5 px-4 py-2 pb-4 overflow-x-auto scroll-smooth hide-scrollbar"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {filteredCategories.map((category) => (
                  <div
                    key={category.docID}
                    // onClick={() => handleCategoryClick(category.name)}
                    className={`carousel-item mt-10 flex-shrink-0 w-[calc(33.333%-1rem)] min--[235px] max-w-[200px] bg-[#ECF5FE] p-6 rounded-lg shadow-md text-center transition-transform duration-300 ease-in-out hover:scale-105 `}
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className='flex bg-[#ECF5FE] rounded-xl h-auto  w-full flex-col'>

                      <div onClick={() => handleCategoryClick(category.name)} className="w-24 cursor-pointer h-24  mb-4 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">{category.name.charAt(0)}</span>
                      </div>

                      <div className='flex flex-col items-start'>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {highlightText(category.name, searchTerm)}
                        </h3>
                        <button onClick={() => handleCategoryClick(category.name)} className='bg-black text-white w-full p-2 text-sm rounded-full'>View Profiles</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-4 flex-shrink-0" aria-hidden="true" />
              </div>
            )
        }

        {/* Next Button */}
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute right-2 top-[66%] transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div >
  );
};

export default AllCategories;