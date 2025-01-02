import React, { useContext, useEffect, useRef, useState } from 'react';
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import { PiStarFourBold } from "react-icons/pi";
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { BsPatchCheck } from "react-icons/bs";
import Sidebar from '../Sidebar.jsx'
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import SearchBar from '../SearchBar.jsx';

const CastingMain = () => {
    const notifyData = useContext(NotificatinData);
    const [popup, setpopup] = useState(false);
    const handlePopup = () => {
        setpopup(!popup)
    }
    const [showSidebar, setShowSidebar] = useState(false);
    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false); // Close search bar if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
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
                <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
                    <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>Casting Calls</h1>
                    {showSidebar && (
                        <dialog id="my_modal_3" className="modal" open>
                            <div className="w-full h-full ">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
                                </form>
                                <Sidebar />
                            </div>
                        </dialog>
                    )}
                    {search && (
                        <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
                    )}
                    <div className={`flex ${search && 'm-3'} justify-end gap-2 md:gap-5 items-center w-full z-20`}>
                        {/* <div
                            ref={searchRef}
                            className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'}`}
                        >
                            <img onClick={handleSearch} src={searchi} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer' alt="Search" />

                            <input
                                onClick={handleSearch}
                                type="search"
                                placeholder='Search'
                                className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${search ? 'block' : 'hidden md:flex'}`}
                            />

                            {search && (
                                <img src={Arrow} onClick={handleSearch} className='w-9 p-1 h-9 bg-black rounded-full cursor-pointer' />
                            )}

                            {search && (
                                <div className='bg-white absolute md:right-2 right-0 top-full mt-3 w-full md:w-[98%] rounded-lg p-4'>
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
                        </div> */}
                        <SearchBar search={search} setSearch={setSearch} />
                        <div
                            onClick={() => {
                                if (window.innerWidth <= 640) {
                                    handlePopup();
                                } else {
                                    handleBar();
                                }
                            }}
                            className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}
                        >
                            <img src={Notifications} alt="Notifications" />
                        </div>
                        {
                            popup && (
                                <div className='bg-black bg-opacity-50 inset-0 fixed top-0'>
                                    <dialog className="modal" open>
                                        <div className="bg-white h-screen w-full p-0">
                                            <button
                                                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
                                                onClick={handlePopup}
                                            >
                                                ✕
                                            </button>
                                            <div className="border-b mb-3 px-6 pt-6 border-gray-300">
                                                <h3 className="font-bold mb-4 text-lg">Notifications</h3>
                                            </div>
                                            <div className="px-6 flex mb-2 flex-col justify-center gap-3">
                                                {
                                                    notifyData.length > 0 ? (
                                                        notifyData.map((data, index) => (
                                                            <div className="flex items-center gap-2" key={index}>
                                                                <img
                                                                    className="w-14 h-14 rounded-full"
                                                                    src={data.fromImage}
                                                                    alt="image"
                                                                />
                                                                <div className="flex flex-col justify-center">
                                                                    <h1 className="font-semibold">
                                                                        {data.fromName} <span className="font-light">{data.title}</span>
                                                                    </h1>
                                                                    <p className="text-[#9B9B9B] text-sm">
                                                                        {data.createdAt ? format(new Date(data.createdAt), 'MMM dd, yyyy, hh:mm a') : 'Date not available'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-center text-gray-400 text-sm">
                                                            No notifications available
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            )
                        }

                    </div>


                </div>
                <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                    <div className='p-[2px]  overflow-x-auto'>
                        <div className="bg-gray-100 w-full overflow-x-auto">
                            <ul className="flex py-6 mb-2 md:mb-0 md:border-b-0 border-b border-gray-300 overflow-x-auto px-4 bg-white gap-4 whitespace-nowrap w-full">
                                <li>
                                    <NavLink
                                        to="/casting/calls"
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-[#399AF3]' : 'font-normal text-inherit'}`
                                        }
                                    >
                                        <PiStarFourBold className="text-2xl" />
                                        <h1 className="whitespace-nowrap">Casting</h1>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/casting/applied"
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-[#399AF3]' : 'font-normal text-inherit'}`
                                        }
                                    >
                                        <BsPatchCheck className="text-2xl" />
                                        Applied
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/casting/mycalls"
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center ${isActive ? 'font-bold text-[#399AF3]' : 'font-normal text-inherit'}`
                                        }
                                    >
                                        <PiStarFourBold className="text-2xl" />
                                        <h1 className="whitespace-nowrap">My Casting</h1>
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
