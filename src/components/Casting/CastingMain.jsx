import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Rightbar from '../Rightbar';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import { PiStarFourBold } from "react-icons/pi";
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import { BsPatchCheck } from "react-icons/bs";

const CastingMain = () => {
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
    const location = useLocation();

    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        console.log("Search button clicked");
        setSearch(!search);
    };

    if (location.pathname === '/casting') {
        return <Navigate to="/casting/calls" />;
    }

    return (
        <div className='main flex'>
            <div className='flex-grow p-[2px] bg-gray-100'>
                <div className='flex px-0 justify-between bg-white items-center border-b py-4'>
                <h1 className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold p-3'}`}>Casting Calls</h1>
                    {search && (
                        <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
                    )}
                    <div className={`flex justify-end gap-5 items-center w-full z-30`}>
                        <div
                            ref={searchRef}
                            className={`relative  flex justify-end items-center bg-[#F5F5F5] rounded-3xl px-3 py-2 space-x-2 transition-all duration-300 ease-in-out ${search ? ' w-full' : 'w-[300px]'}`}
                        >

                            <img src={searchi} alt="" />
                            <input
                                onClick={handleSearch}
                                type="search"
                                placeholder='Search'
                                className='outline-none bg-transparent rounded px-2 py-1 w-full'
                            />
                            {search && (
                                <FaArrowCircleRight onClick={handleSearch} className='text-2xl cursor-pointer' />
                            )}
                            {search && (
                                <div className='bg-white absolute top-full mt-2 w-[98%] rounded-lg p-4'>
                                    <div className="recent flex items-center justify-between mx-1">
                                        <div>
                                            <h2 className='text-gray-400 text-sm'>Recent</h2>
                                        </div>
                                        <div>
                                            <button className='text-[#399AF3] text-sm'>Clear all</button>
                                        </div>
                                    </div>
                                    <div className="users flex justify-between items-center m-1">
                                        <h1>Hamza Akbar</h1>
                                        <h1 className='cursor-pointer'>X</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div onClick={handleBar} className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}>
                            <img src={Notifications} alt="" />
                        </div>
                    </div>
                </div>
                <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className=" bg-gray-100">
                            <ul className='flex py-6 px-4 bg-white gap-4'>
                                <li>
                                    <NavLink
                                        to='/casting/calls'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-[#399AF3]' : 'font-normal text-inherit'}`
                                        }
                                    >
                                        <PiStarFourBold className='text-2xl' />
                                        Casting Calls
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/casting/applied'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-[#399AF3]' : 'font-normal text-inherit'}`
                                        }
                                    >
                                        <BsPatchCheck className='text-2xl' />
                                        Applied
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/casting/mycalls'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-[#399AF3]' : 'font-normal text-inherit'}`
                                        }
                                    >
                                        <PiStarFourBold className='text-2xl' />
                                        My Casting Calls
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            {showRightbar && (
                <div className='w-[26%]'>
                    <Rightbar />
                </div>
            )}
        </div>
    );
};

export default CastingMain;
