// import React, { useContext } from 'react';
// import { IndustryData } from '../../Context/IndustryContext';
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import '../../CSS/Connections.css';
// import DramaCards from './DramaCards';
// import Conneections from '../Conneections';
// import { useAuth } from '../../Context/AuthContext';
// const IndustryPage = ({ network, reqData, onAccept, onReject, onConnect, connectionStatus , landingtalent }) => {
//     const talentData = useContext(IndustryData);
//     const { currentUser } = useAuth();

//     const dummyId = currentUser ? currentUser.uid : null;
//     const getConnectionStatus = (user) => {
//         // If network prop is true, use reqData
//         const dataToUse = network ? reqData : talentData;

//         // Check if the current user's ID is in the targeted user's requested array
//         if (user.received && user.received.includes(dummyId)) {
//             return 'requested';
//         }

//         // Check if the current user's ID is in the targeted user's connected array
//         if (user.connected && user.connected.includes(dummyId)) {
//             return 'connected';
//         }

//         return 'connect';
//     };

//     return (
//         <div className="container overflow-x-hidden ">
//             <div className="swiper-grid-container">
//                 <Swiper
//                     modules={[Navigation, Pagination, Scrollbar, A11y]}
//                     spaceBetween={`${landingtalent ? '60' : '10'}`}
//                     navigation={false}
//                     loop={true}
//                     loopFillGroupWithBlank={true}
//                     scrollbar={{ draggable: true }}
//                     className={`swiper-container w-full overflow-hidden`}
//                     breakpoints={{
//                         640: { slidesPerView: 1 },
//                         768: { slidesPerView: 2 },
//                         1024: { slidesPerView: 3 },
//                         1280: { slidesPerView: 6 },
//                     }}
//                 >
//                     {
//                         network ? (
//                             reqData.map((data, index) => (
//                                 <SwiperSlide key={index} className="!w-auto max-w-[17%] min-w-[260px]">
//                                     <Conneections
//                                         image={data.image}
//                                         username={data.username}
//                                         description={data.description}
//                                         network={network}
//                                         user={data.user}
//                                         onAccept={onAccept}
//                                         onReject={onReject}
//                                         connectionStatus={connectionStatus}

//                                     />
//                                 </SwiperSlide>
//                             ))
//                         ) : (
//                             <div>
//                                 {
//                                     talentData.map((data) => (
//                                         <SwiperSlide key={data.id} className={`!w-auto max-w-[17%] min-w-[260px] ${
//                                             landingtalent ? '!w-auto md:max-w-[30%] md:min-w-[260px] hove:scale-[1.1] transition-transform duration-300 ease-in-out ' : ''
//                                           }`}>
//                                             <DramaCards
//                                             image={data.image}
//                                             firstName={data.firstName}
//                                             categoryName={data.categoryName}
//                                             docID={data.docID}
//                                             onConnect={onConnect}
//                                             connectionStatus={getConnectionStatus(data)}
//                                             network={network}
//                                             landingtalent={landingtalent}
//                                             // landingtalent={!network}
//                                         />
//                                         </SwiperSlide>
//                                     ))

//                                 }
//                                 {/* {(network ? reqData : talentData).map((data) => (
//                                     <SwiperSlide key={data.docID}>
//                                         <TalentCards
//                                             image={data.image}
//                                             firstName={data.firstName}
//                                             categoryName={data.categoryName}
//                                             docID={data.docID}
//                                             onConnect={onConnect}
//                                             connectionStatus={getConnectionStatus(data)}
//                                             network={network}
//                                             landingtalent={!network}
//                                         />
//                                     </SwiperSlide>
//                                 ))} */}
//                             </div>
//                         )
//                     }
//                 </Swiper>
//             </div>
//         </div>
//     );
// };

// export default IndustryPage;
import React, { useContext, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importing the icons
import { IndustryData } from '../../Context/IndustryContext';
import { useAuth } from '../../Context/AuthContext';
import DramaCards from './DramaCards';
import Conneections from '../Conneections';

const IndustryPage = ({
    network,
    reqData,
    onAccept,
    onConnect,
    connectionStatus,
    landingtalent,
    showRightbar
}) => {
    const talentData = useContext(IndustryData);
    const { currentUser } = useAuth();
    const dummyId = currentUser ? currentUser.uid : null;

    const carouselRef = useRef(null);

    const getConnectionStatus = (user) => {
        if (user.received && user.received.includes(dummyId)) {
            return 'requested';
        }
        if (user.connected && user.connected.includes(dummyId)) {
            return 'connected';
        }
        return 'connect';
    };

    const items = network ? reqData : talentData;

    // State to manage button disable states
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Function to check scroll position and update button states
    const checkScrollPosition = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const { scrollLeft, scrollWidth, clientWidth } = carousel;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition(); // Initial check
            return () => {
                carousel.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, [items]);

    const scrollCarousel = (direction) => {
        const carousel = carouselRef.current;
        if (carousel) {
            const scrollAmount = carousel.offsetWidth * 0.8; // Adjust the multiplier as needed
            carousel.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={`relative ${showRightbar && 'md:max-w-[62vw]'} md:max-w-[79vw] w-[100vw] 2xl:w-[80vw] overflow-x-hidden hide-scrollbar ${landingtalent && 'min-w-[98vw]'}`}>
            {/* Previous Button */}
            <button
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity ${
                    !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                aria-label="Scroll Left"
            >
                <ChevronLeft size={24} /> {/* Using the ChevronLeft icon */}
            </button>

            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className={`carousel flex gap-4 px-4 py-2 pb-4 ${landingtalent && ''} overflow-x-auto scroll-smooth hide-scrollbar`}
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {items.map((data, index) => (
                    <div
                        key={network ? index : data.id}
                        className={`
                            carousel-item flex-shrink-0
                            ${landingtalent 
                                ? 'w-[100vw] hover:scale-105' 
                                : 'w-[65vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]'}
                            min-w-[260px] max-w-[300px]
                            transition-transform duration-300 ease-in-out
                            relative
                        `}
                        style={{
                            scrollSnapAlign: 'start'
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
                {/* Add empty div at the end to prevent sidebar hiding */}
                <div className="w-4 flex-shrink-0" aria-hidden="true" />
            </div>

            {/* Next Button */}
            <button
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity ${
                    !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                aria-label="Scroll Right"
            >
                <ChevronRight size={24} /> {/* Using the ChevronRight icon */}
            </button>
        </div>
    );
};

export default IndustryPage;
