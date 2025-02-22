import React, { useContext, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IndustryData } from "../../Context/IndustryContext";
import { useAuth } from "../../Context/AuthContext";
import DramaCards from "./DramaCards";
import Conneections from "../Conneections";
import { useLocation } from "react-router-dom";

const IndustryPage = ({
  network,
  reqData = [],
  onAccept,
  onConnect,
  connectionStatus,
  landingtalent,
  showRightbar,
}) => {
  const { talentData = [] } = useContext(IndustryData);
  const { currentUser } = useAuth();
  const dummyId = currentUser ? currentUser.uid : null;

  const location = useLocation();
  const carouselRef = useRef(null);

  const [filteredData, setFilteredData] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  const getConnectionStatus = (user) => {
    if (user.received && user.received.includes(dummyId)) {
      return "requested";
    }
    if (user.connected && user.connected.includes(dummyId)) {
      return "connected";
    }
    return "connect";
  };

  const items = network
    ? Array.isArray(reqData)
      ? reqData
      : []
    : Array.isArray(filteredData)
    ? filteredData
    : [];

  useEffect(() => {
    if (Array.isArray(talentData)) {
      let filtered = talentData;

      // Search query filtering
      if (searchQuery.trim()) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            (user.firstName && user.firstName.toLowerCase().includes(lowercasedQuery)) ||
            (user.username && user.username.toLowerCase().includes(lowercasedQuery)) || 
            (user.categoryName && 
              (Array.isArray(user.categoryName)
                ? user.categoryName.some(category => category.toLowerCase().includes(lowercasedQuery)) // check if any category matches
                : user.categoryName.toLowerCase().includes(lowercasedQuery)) // check if it's a string and matches
            )
        );
      }

      // Update filteredData
      setFilteredData(filtered);
    } else {
      console.error("talentData is not an array:", talentData);
      setFilteredData([]);
    }
  }, [searchQuery, talentData]);

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

  return (
    <div
      className={`relative ${showRightbar && "md:max-w-[62vw]"} md:max-w-[79vw] w-[100vw] 2xl:w-[80vw] overflow-x-hidden hide-scrollbar ${landingtalent && "min-w-[98vw]"}`}
    >
      <button
        onClick={() => scrollCarousel("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
        aria-label="Scroll Left"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={carouselRef}
        className="carousel flex md:gap-4 px-4 py-2 pb-4 overflow-x-auto scroll-smooth hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((data, index) => (
          <div
            key={network ? index : data.id}
            className={`carousel-item flex-shrink-0 ${landingtalent ? "w-[100vw] hover:scale-105" : "w-[65vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]"} min-w-[260px] max-w-[300px] transition-transform duration-300 ease-in-out relative`}
            style={{ scrollSnapAlign: "start" }}
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
        <div className="w-4 flex-shrink-0" aria-hidden="true" />
      </div>

      <button
        onClick={() => scrollCarousel("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none transition-opacity"
        aria-label="Scroll Right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default IndustryPage;
