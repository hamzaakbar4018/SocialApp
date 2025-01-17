import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TabsWithSearch = () => {
  const [activeTab, setActiveTab] = useState("Categories"); // Default active tab
  const [searchQuery, setSearchQuery] = useState(""); // Controlled input for the search bar
  const navigate = useNavigate(); // For navigation

  const handleSearch = () => {
    const queryParam = searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery)}` : "";
    
    // Redirect to the active tab's page with or without the search query
    switch (activeTab) {
      case "Categories":
        navigate(`/categories${queryParam}`);
        break;
      case "Talent":
        navigate(`/talent${queryParam}`);
        break;
      case "Casting Call":
        navigate(`/casting/calls${queryParam}`);
        break;
      default:
        break;
    }
  };

  const tabs = ["Categories", "Talent", "Casting Call"]; // Tab options

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 shadow-md rounded-lg">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? "text-[#d6587f] border-b-2 border-[#d6587f]"
                : "text-gray-600 hover:text-[#d6587f]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={searchQuery} // Controlled input
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input
          placeholder={`Search ${activeTab}`} // Dynamic placeholder
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none"
        />
        <button
          onClick={handleSearch} // Trigger the search logic
          className="bg-[#d6587f] text-white py-2 px-4 rounded-md hover:bg-[#d6587f]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TabsWithSearch;
