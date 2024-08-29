import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Rightbar from './Rightbar';
import { NavLink, Outlet } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import ProfileCard from '../Cards/ProfileCard';
import { CiBoxList } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";

const ProfileMain = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);

    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        setSearch(!search);
    };

    const userData = [{
        userImg: "https://randomuser.me/api/portraits/men/10.jpg",
        username: "JohnDoe123",
        description: "Actor | Director",
    }];

    return (
        <div className='flex'>
            <div className='flex-grow'>
                <div className='flex px-0 justify-between items-center border-b py-4'>
                    <h1 className='text-xl p-3'>Terms & Conditions</h1>
                    <div className='flex justify-center gap-5 items-center'>
                        <div
                            className={`relative flex items-center bg-[#F5F5F5] rounded-3xl px-3 py-2 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-[630px]' : 'w-[300px]'}`}
                        >
                            {search && (
                                <div className='bg-white absolute top-full mt-2 w-[97%] rounded-lg p-4'>
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
                            <CiSearch className='cursor-pointer font-bold' />
                            <input
                                onClick={handleSearch}
                                type="search"
                                placeholder='Search'
                                className='outline-none bg-transparent rounded px-2 py-1 w-full'
                            />
                            {search && (
                                <FaArrowCircleRight onClick={handleSearch} className='text-2xl cursor-pointer' />
                            )}
                        </div>
                        <div onClick={handleBar} className='rounded-full cursor-pointer bg-[#F5F5F5] p-3 mr-4 border border-gray-300'>
                            <IoMdNotificationsOutline className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className={`showcard transition-all ${showRightbar ? '' : 'mr-[1%]'}`}>
                    <div className='p-[5px]'>
                        <div className='bg-gray-100'>
                            {userData.map((data, index) => (
                                <ProfileCard key={index} {...data} />
                            ))}
                        </div>
                    </div>

                    <div className='p-[5px]'>
                        <div className='bg-gray-100 rounded p-6'>
                            <ul className='flex gap-6 text-gray-400'>
                                <li>
                                    <NavLink
                                        to='/profile/profileactivity'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        <CiBoxList className={`text-2xl ${isActive => isActive ? 'text-[#399AF3]' : 'text-gray-400'}`} />
                                        Activity
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/profile/profileabout'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        <FaRegUser className={`text-xl ${isActive => isActive ? 'text-[#399AF3]' : 'text-gray-400'}`} />
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/profile/profilemywork'
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-black' : ''}`
                                        }
                                    >
                                        <AiOutlinePicture className={`text-2xl ${isActive => isActive ? 'text-[#399AF3]' : 'text-gray-400'}`} />
                                        My Work
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Nested route content will be rendered here */}
                    <Outlet />
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

export default ProfileMain;
