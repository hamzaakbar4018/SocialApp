import React, { useEffect, useRef, useState } from 'react';
import Rightbar from './Rightbar';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import Arrow from '../assets/Icons SVG/Arrow.svg'
import ProfileCard from '../Cards/ProfileCard';
import { CiBoxList } from "react-icons/ci";
import searchi from '../assets/Icons SVG/Search.svg'
import Notifications from '../assets/Icons SVG/Notifications.svg'
import Activity from '../assets/Icons SVG/Activity.svg'
import activityblue from '../assets/Icons SVG/activityblue.svg'
import aboutblue from '../assets/Icons SVG/aboutblue.svg'
import About from '../assets/Icons SVG/About.svg'
import myworkblue from '../assets/Icons SVG/myworkblue.svg'
import MyWork from '../assets/Icons SVG/MyWork.svg'


const ProfileMain = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);
    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        setSearch(!search);
    };
    const location = useLocation();
    if (location.pathname === '/profile') {
        return <Navigate to="/profile/profileactivity" />;
    }
    const userData = [{
        userImg: "https://randomuser.me/api/portraits/men/10.jpg",
        username: "JohnDoe123",
        description: "Actor | Director",
    }];

    const activeStyle = 'filter-[invert(42%) sepia(35%) saturate(1040%) hue-rotate(166deg) brightness(91%) contrast(94%)] text-[#399AF3]'

    return (
        <div className='flex'>
            <div className='flex-grow p-[2px] bg-gray-100'>
                <div className='flex px-0 justify-between bg-white items-center border-b py-4'>
                    <h1 className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold p-3'}`}>My Profile</h1>
                    {search && (
                        <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
                    )}
                    <div className={`flex justify-end gap-5 items-center w-full z-50`}>
                    <div
                            ref={searchRef}
                            className={`relative  flex justify-end items-center bg-[#F5F5F5] rounded-3xl px-3 py-2 space-x-2 transition-all duration-300 ease-in-out ${search ? ' w-full rounded-3xl' : 'w-[300px]'}`}
                        >

                            <img src={searchi} className='w-6 h-6' alt="" />
                            <input
                                onClick={handleSearch}
                                type="search"
                                placeholder='Search'
                                className='outline-none bg-transparent rounded px-2 py-1 w-full'
                            />
                            {search && (
                                <img src={Arrow} onClick={handleSearch} className='w-9 p-1 h-9 bg-black rounded-full cursor-pointer' />
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
                                        <h1 className='cursor-pointer'>✕</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div onClick={handleBar} className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}>
                            <img src={Notifications} alt="" />
                        </div>
                    </div>
                </div>
                <div className={`showcard transition-all ${showRightbar ? '' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className='bg-white'>
                            {userData.map((data, index) => (
                                <ProfileCard key={index} {...data} />
                            ))}
                        </div>
                    </div>

                    <div className='p-[2px]'>
                        <div className='bg-white  p-6'>
                        <ul className='flex gap-6 text-gray-400'>
                                <li>
                                    <NavLink
                                        to='/profile/profileactivity'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={isActive ? activityblue : Activity}
                                                    className={`text-2xl transition-all ${isActive ? '' : 'text-gray-400'}`}
                                                    alt="Activity"
                                                />
                                                Activity
                                            </>
                                        )}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/profile/profileabout'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={isActive ? aboutblue : About}
                                                    className={`text-xl transition-all ${isActive ? activeStyle : 'text-gray-400'}`}
                                                    alt="About"
                                                />
                                                About
                                            </>
                                        )}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/profile/profilemywork'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <img
                                                    src={isActive ? myworkblue : MyWork}
                                                    className={`text-2xl transition-all ${isActive ? activeStyle : 'text-gray-400'}`}
                                                    alt="My Work"
                                                />
                                                My Work
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>

            {showRightbar && (
                <div className='w-[26%]'>
                    <Rightbar />
                </div>
            )}
        </div>
    );
};

export default ProfileMain;
