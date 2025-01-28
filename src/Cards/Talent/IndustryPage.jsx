// // import React, { useContext, useRef, useState, useEffect } from 'react';
// // import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importing the icons
// // import { IndustryData } from '../../Context/IndustryContext';
// // import { useAuth } from '../../Context/AuthContext';
// // import DramaCards from './DramaCards';
// // import Conneections from '../Conneections';

// // const IndustryPage = ({
// //     network,
// //     reqData,
// //     onAccept,
// //     onConnect,
// //     connectionStatus,
// //     landingtalent,
// //     showRightbar
// // }) => {
// //     const talentData = useContext(IndustryData);
// //     const { currentUser } = useAuth();
// //     const dummyId = currentUser ? currentUser.uid : null;

// //     const carouselRef = useRef(null);

// //     const getConnectionStatus = (user) => {
// //         if (user.received && user.received.includes(dummyId)) {
// //             return 'requested';
// //         }
// //         if (user.connected && user.connected.includes(dummyId)) {
// //             return 'connected';
// //         }
// //         return 'connect';
// //     };

// //     const items = network ? reqData : talentData;

// //     // State to manage button disable states
// //     const [canScrollLeft, setCanScrollLeft] = useState(false);
// //     const [canScrollRight, setCanScrollRight] = useState(true);

// //     // Function to check scroll position and update button states
// //     const checkScrollPosition = () => {
// //         const carousel = carouselRef.current;
// //         if (carousel) {
// //             const { scrollLeft, scrollWidth, clientWidth } = carousel;
// //             setCanScrollLeft(scrollLeft > 0);
// //             setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
// //         }
// //     };

// //     useEffect(() => {
// //         const carousel = carouselRef.current;
// //         if (carousel) {
// //             carousel.addEventListener('scroll', checkScrollPosition);
// //             checkScrollPosition(); // Initial check
// //             return () => {
// //                 carousel.removeEventListener('scroll', checkScrollPosition);
// //             };
// //         }
// //     }, [items]);

// //     const scrollCarousel = (direction) => {
// //         const carousel = carouselRef.current;
// //         if (carousel) {
// //             const scrollAmount = carousel.offsetWidth * 0.8; // Adjust the multiplier as needed
// //             carousel.scrollBy({
// //                 left: direction === 'left' ? -scrollAmount : scrollAmount,
// //                 behavior: 'smooth',
// //             });
// //         }
// //     };

// //     return (
// //         <div className={`relative ${showRightbar && 'md:max-w-[62vw]'} md:max-w-[79vw] w-[100vw] 2xl:w-[80vw] overflow-x-hidden hide-scrollbar ${landingtalent && 'min-w-[98vw]'}`}>
// //             {/* Previous Button */}
// //             <button
// //                 onClick={() => scrollCarousel('left')}
// //                 disabled={!canScrollLeft}
// //                 className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity ${
// //                     !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
// //                 }`}
// //                 aria-label="Scroll Left"
// //             >
// //                 <ChevronLeft size={24} /> {/* Using the ChevronLeft icon */}
// //             </button>

// //             {/* Carousel Container */}
// //             <div
// //                 ref={carouselRef}
// //                 className={`carousel flex gap-4 px-4 py-2 pb-4 ${landingtalent && ''} overflow-x-auto scroll-smooth hide-scrollbar`}
// //                 style={{ scrollSnapType: 'x mandatory' }}
// //             >
// //                 {items.map((data, index) => (
// //                     <div
// //                         key={network ? index : data.id}
// //                         className={`
// //                             carousel-item flex-shrink-0
// //                             ${landingtalent 
// //                                 ? 'w-[100vw] hover:scale-105' 
// //                                 : 'w-[65vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]'}
// //                             min-w-[260px] max-w-[300px]
// //                             transition-transform duration-300 ease-in-out
// //                             relative
// //                         `}
// //                         style={{
// //                             scrollSnapAlign: 'start'
// //                         }}
// //                     >
// //                         {network ? (
// //                             <Conneections
// //                                 image={data.image}
// //                                 username={data.username}
// //                                 description={data.description}
// //                                 network={network}
// //                                 user={data.user}
// //                                 onAccept={onAccept}
// //                                 connectionStatus={connectionStatus}
// //                             />
// //                         ) : (
// //                             <DramaCards
// //                                 image={data.image}
// //                                 firstName={data.firstName}
// //                                 categoryName={data.categoryName}
// //                                 docID={data.docID}
// //                                 onConnect={onConnect}
// //                                 connectionStatus={getConnectionStatus(data)}
// //                                 network={network}
// //                                 landingtalent={landingtalent}
// //                             />
// //                         )}
// //                     </div>
// //                 ))}
// //                 {/* Add empty div at the end to prevent sidebar hiding */}
// //                 <div className="w-4 flex-shrink-0" aria-hidden="true" />
// //             </div>

// //             {/* Next Button */}
// //             <button
// //                 onClick={() => scrollCarousel('right')}
// //                 disabled={!canScrollRight}
// //                 className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity ${
// //                     !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
// //                 }`}
// //                 aria-label="Scroll Right"
// //             >
// //                 <ChevronRight size={24} /> {/* Using the ChevronRight icon */}
// //             </button>
// //         </div>
// //     );
// // };

// // export default IndustryPage;
// import React, { useContext, useRef, useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importing the icons
// import { IndustryData } from '../../Context/IndustryContext';
// import { useAuth } from '../../Context/AuthContext';
// import DramaCards from './DramaCards';
// import Conneections from '../Conneections';
// import { useLocation } from 'react-router-dom'; // Import useLocation for query params

// const IndustryPage = ({
//     network,
//     reqData,
//     onAccept,
//     onConnect,
//     connectionStatus,
//     landingtalent,
//     showRightbar,
// }) => {
//     const talentData = useContext(IndustryData);
//     const { currentUser } = useAuth();
//     const dummyId = currentUser ? currentUser.uid : null;

//     const location = useLocation(); // To get query parameters
//     const carouselRef = useRef(null);

//     const [filteredData, setFilteredData] = useState(talentData); // Manage filtered data

//     // Extract query parameter from the URL
//     const searchQuery = new URLSearchParams(location.search).get('q') || ''; // Default to empty string if no query

//     const getConnectionStatus = (user) => {
//         if (user.received && user.received.includes(dummyId)) {
//             return 'requested';
//         }
//         if (user.connected && user.connected.includes(dummyId)) {
//             return 'connected';
//         }
//         return 'connect';
//     };

//     const items = network ? reqData : filteredData;

//     // Filter data when searchQuery changes
//     useEffect(() => {
//         if (searchQuery.trim()) {
//             const lowercasedQuery = searchQuery.toLowerCase();
//             const filtered = talentData.filter((user) =>
//                 user.firstName?.toLowerCase().includes(lowercasedQuery) || // Check first name
//                 // user.categoryName?.toLowerCase().includes(lowercasedQuery) || // Check category name
//                 user.username?.toLowerCase().includes(lowercasedQuery) // Check username
//             );
//             setFilteredData(filtered);
//         } else {
//             setFilteredData(talentData); // Show all data if no query
//         }
//     }, [searchQuery, talentData]);

//     // State to manage button disable states
//     const [canScrollLeft, setCanScrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);

//     // Function to check scroll position and update button states
//     const checkScrollPosition = () => {
//         const carousel = carouselRef.current;
//         if (carousel) {
//             const { scrollLeft, scrollWidth, clientWidth } = carousel;
//             setCanScrollLeft(scrollLeft > 0);
//             setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
//         }
//     };

//     useEffect(() => {
//         const carousel = carouselRef.current;
//         if (carousel) {
//             carousel.addEventListener('scroll', checkScrollPosition);
//             checkScrollPosition(); // Initial check
//             return () => {
//                 carousel.removeEventListener('scroll', checkScrollPosition);
//             };
//         }
//     }, [items]);

//     const scrollCarousel = (direction) => {
//         const carousel = carouselRef.current;
//         if (carousel) {
//             const scrollAmount = carousel.offsetWidth * 0.8; // Adjust the multiplier as needed
//             carousel.scrollBy({
//                 left: direction === 'left' ? -scrollAmount : scrollAmount,
//                 behavior: 'smooth',
//             });
//         }
//     };


//     return (
//         <div
//             className={`relative ${showRightbar && 'md:max-w-[62vw]'} md:max-w-[79vw] w-[100vw] 2xl:w-[80vw] overflow-x-hidden hide-scrollbar ${
//                 landingtalent && 'min-w-[98vw]'
//             }`}
//         >
//             {/* Previous Button */}
//             <button
//                 onClick={() => scrollCarousel('left')}
//                 disabled={!canScrollLeft}
//                 className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity ${
//                     !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
//                 }`}
//                 aria-label="Scroll Left"
//             >
//                 <ChevronLeft size={24} /> {/* Using the ChevronLeft icon */}
//             </button>

//             {/* Carousel Container */}
//             <div
//                 ref={carouselRef}
//                 className={`carousel flex gap-4 px-4 py-2 pb-4 ${
//                     landingtalent && ''
//                 } overflow-x-auto scroll-smooth hide-scrollbar`}
//                 style={{ scrollSnapType: 'x mandatory' }}
//             >
//                 {items.map((data, index) => (
//                     <div
//                         key={network ? index : data.id}
//                         className={`
//                             carousel-item flex-shrink-0
//                             ${
//                                 landingtalent
//                                     ? 'w-[100vw] hover:scale-105'
//                                     : 'w-[65vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]'
//                             }
//                             min-w-[260px] max-w-[300px]
//                             transition-transform duration-300 ease-in-out
//                             relative
//                         `}
//                         style={{
//                             scrollSnapAlign: 'start',
//                         }}
//                     >
//                         {network ? (
//                             <Conneections
//                                 image={data.image}
//                                 username={data.username}
//                                 description={data.description}
//                                 network={network}
//                                 user={data.user}
//                                 onAccept={onAccept}
//                                 connectionStatus={connectionStatus}
//                             />
//                         ) : (
//                             <DramaCards
//                                 image={data.image}
//                                 firstName={data.firstName}
//                                 categoryName={data.categoryName}
//                                 docID={data.docID}
//                                 onConnect={onConnect}
//                                 connectionStatus={getConnectionStatus(data)}
//                                 network={network}
//                                 landingtalent={landingtalent}
//                             />
//                         )}
//                     </div>
//                 ))}
//                 {/* Add empty div at the end to prevent sidebar hiding */}
//                 <div className="w-4 flex-shrink-0" aria-hidden="true" />
//             </div>

//             {/* Next Button */}
//             <button
//                 onClick={() => scrollCarousel('right')}
//                 disabled={!canScrollRight}
//                 className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity ${
//                     !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
//                 }`}
//                 aria-label="Scroll Right"
//             >
//                 <ChevronRight size={24} /> {/* Using the ChevronRight icon */}
//             </button>
//         </div>
//     );
// };

// export default IndustryPage;


import React, { useContext, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons
import { IndustryData } from "../../Context/IndustryContext"; // Context for industry data
import { useAuth } from "../../Context/AuthContext"; // Context for authentication
import DramaCards from "./DramaCards"; // Custom component for drama cards
import Conneections from "../Conneections"; // Custom component for connections
import { useLocation } from "react-router-dom"; // For handling query parameters

const IndustryPage = ({
  network,
  reqData = [], // Default reqData to an empty array
  onAccept,
  onConnect,
  connectionStatus,
  landingtalent,
  showRightbar,
}) => {
  const { talentData = [] } = useContext(IndustryData); // Default talentData to an empty array
  const { currentUser } = useAuth();
  const dummyId = currentUser ? currentUser.uid : null;

  const location = useLocation(); // Get query parameters from the URL
  const carouselRef = useRef(null);

  const [filteredData, setFilteredData] = useState([]); // State to manage filtered data
  const searchQuery = new URLSearchParams(location.search).get('q') || '';
  // Function to determine connection status
  const getConnectionStatus = (user) => {
    if (user.received && user.received.includes(dummyId)) {
      return "requested";
    }
    if (user.connected && user.connected.includes(dummyId)) {
      return "connected";
    }
    return "connect";
  };

  // Safely assign items based on network or filteredData
  const items = network
    ? Array.isArray(reqData)
      ? reqData
      : []
    : Array.isArray(filteredData)
    ? filteredData
    : [];

  // Debugging: Log the current state of talentData and items
  // console.log("talentData:", talentData);
  // console.log("Is talentData an array?", Array.isArray(talentData));
  // console.log("items:", items);

  // Filter data when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      if (Array.isArray(talentData)) {
        const filtered = talentData.filter(
          (user) =>
            user.firstName?.toLowerCase().includes(lowercasedQuery) ||
            user.username?.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredData(filtered);
      } else {
        console.error("talentData is not an array:", talentData);
        setFilteredData([]);
      }
    } else {
      setFilteredData(talentData); // Reset to all data if no query
    }
  }, [searchQuery, talentData]);

  // Carousel scrolling logic
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = carousel.offsetWidth * 0.8; // Adjust scrolling amount as needed
      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`relative ${
        showRightbar && "md:max-w-[62vw]"
      } md:max-w-[79vw] w-[100vw] 2xl:w-[80vw] overflow-x-hidden hide-scrollbar ${
        landingtalent && "min-w-[98vw]"
      }`}
    >
      {/* Carousel Navigation Buttons */}
      <button
        onClick={() => scrollCarousel("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
        aria-label="Scroll Left"
      >
        <ChevronLeft size={24} /> {/* ChevronLeft icon */}
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="carousel flex gap-4 px-4 py-2 pb-4 overflow-x-auto scroll-smooth hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((data, index) => (
          <div
            key={network ? index : data.id}
            className={`carousel-item flex-shrink-0 ${
              landingtalent
                ? "w-[100vw] hover:scale-105"
                : "w-[65vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]"
            } min-w-[260px] max-w-[300px] transition-transform duration-300 ease-in-out relative`}
            style={{
              scrollSnapAlign: "start",
            }}
          >
            {network ? (
              <Conneections
                image={data.image}
                username={data.username}
                description={data.description}
                network={network}
                user={data.user}
                onAccept={onAccept}
                connectionStatus={connectionStatus}
              />
            ) : (
              <DramaCards
                image={data.image}
                firstName={data.firstName}
                categoryName={data.categoryName}
                docID={data.docID}
                onConnect={onConnect}
                connectionStatus={getConnectionStatus(data)}
                network={network}
                landingtalent={landingtalent}
              />
            )}
          </div>
        ))}
        {/* Empty div at the end to avoid cutting content */}
        <div className="w-4 flex-shrink-0" aria-hidden="true" />
      </div>

      {/* Next Button */}
      <button
        onClick={() => scrollCarousel("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
        aria-label="Scroll Right"
      >
        <ChevronRight size={24} /> {/* ChevronRight icon */}
      </button>
    </div>
  );
};

export default IndustryPage;

