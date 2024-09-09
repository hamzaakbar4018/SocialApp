import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import Rightbar from "./Rightbar";
import { FaArrowCircleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import IndustryData from "../Cards/IndustryData";
import ProductionData from "../Cards/ProductionData";

const TalentMain = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false); // Close search bar if click is outside
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);
    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        console.log("Search button clicked");
        setSearch(!search);
    };



    return (
        <div className={`flex ${showRightbar ? "col-span-8" : "col-span-10"} transition-all`}>
            <div className="flex-grow w-full">
                <div className="flex px-0 justify-between items-center border-b py-4">
                    <h1 className="text-xl p-3">Talent</h1>
                    <div className="flex justify-center gap-5 items-center">
                        <div
                            ref={searchRef}
                            className={`relative flex items-center bg-[#F5F5F5] rounded-3xl px-3 py-2 space-x-2 transition-all duration-300 ease-in-out ${search ? "w-[630px]" : "w-[300px]"
                                }`}
                        >
                            {search && (
                                <div className="bg-white absolute top-full mt-2 w-[97%] rounded-lg p-4">
                                    <div className="recent flex items-center justify-between mx-1">
                                        <div>
                                            <h2 className="text-gray-400 text-sm">Recent</h2>
                                        </div>
                                        <div>
                                            <button className="text-[#399AF3] text-sm">
                                                Clear all
                                            </button>
                                        </div>
                                    </div>
                                    <div className="users flex justify-between items-center m-1">
                                        <h1>Hamza Akbar</h1>
                                        <h1 className="cursor-pointer">X</h1>
                                    </div>
                                </div>
                            )}
                            <CiSearch className="cursor-pointer font-bold" />
                            <input
                                onClick={handleSearch}
                                type="search"
                                placeholder="Search"
                                className="outline-none bg-transparent rounded px-2 py-1 w-full"
                            />
                            {search && (
                                <FaArrowCircleRight
                                    onClick={handleSearch}
                                    className="text-2xl cursor-pointer"
                                />
                            )}
                        </div>
                        <div
                            onClick={handleBar}
                            className="rounded-full cursor-pointer bg-[#F5F5F5] p-3 mr-4 border border-gray-300"
                        >
                            <IoMdNotificationsOutline className="cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="p-[5px]">
                    <div className="rounded bg-gray-100  p-4 space-y-2">
                        <h3 className="font-bold text-2xl">People in Drama Industry</h3>
                        <IndustryData />
                    </div>
                    <div className="rounded bg-gray-100  p-4 space-y-2">
                        <h3 className="font-bold text-2xl">Popular Production houses</h3>
                        <ProductionData />
                    </div>
                </div>
            </div>

            {showRightbar && (
                <div className="w-[26%]">
                    <Rightbar />
                </div>
            )}
        </div>
    );
};

export default TalentMain;
