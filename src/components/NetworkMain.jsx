import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Rightbar from './Rightbar';
import { FaArrowCircleRight } from 'react-icons/fa';
import TalentCards from '../Cards/Talent/TalentCards';
import Conneections from '../Cards/Conneections';
const NetworkMain = () => {
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
    const talentData = [
        {
            id: 1,
            userpic: "https://randomuser.me/api/portraits/men/1.jpg",
            name: "John Doe",
            text: "Actor | Model",
        },
        {
            id: 2,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Jane Smith",
            text: "Model | Director",
        },
        {
            id: 3,
            userpic: "https://randomuser.me/api/portraits/men/12.jpg",
            name: "Michael Johnson",
            text: "Actor | Director",
        },
        {
            id: 4,
            userpic: "https://randomuser.me/api/portraits/women/13.jpg",
            name: "Emily Davis",
            text: "Model",
        },
        {
            id: 5,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Chris Brown",
            text: "Actor",
        },
        {
            id: 6,
            userpic: "https://randomuser.me/api/portraits/women/15.jpg",
            name: "Sophia Wilson",
            text: "Director",
        },
        {
            id: 7,
            userpic: "https://randomuser.me/api/portraits/men/16.jpg",
            name: "David Miller",
            text: "Actor | Model | Director",
        },
        {
            id: 8,
            userpic: "https://randomuser.me/api/portraits/women/17.jpg",
            name: "Olivia Taylor",
            text: "Model | Actor",
        },
    ];
    const reqData = [
        {
            "image": "https://randomuser.me/api/portraits/men/10.jpg",
            "username": "michael_scott",
            "description": "1 day ago"
        },
        {
            "image": "https://randomuser.me/api/portraits/women/20.jpg",
            "username": "pam_beesly",
            "description": "Just Now"
        },
        {
            "image": "https://randomuser.me/api/portraits/men/30.jpg",
            "username": "jim_halpert",
            "description": "2 hours ago"
        },
    ]


    return (
        <div className='flex'>
            <div className='flex-grow'>
                <div className='flex px-0 justify-between items-center border-b py-4'>
                    <h1 className='text-xl p-3'>My Network</h1>
                    <div className='flex justify-center gap-5 items-center'>
                        <div
                            ref={searchRef}
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
                <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[1%]'}`}>
                    <div className='p-[5px]'>
                        <div className='rounded bg-gray-100 p-2'>
                            <h1 className='font-bold'>Requests ({reqData.length})</h1>
                            <div className='flex flex-wrap gap-5 p-4  mt-4'>
                                {reqData.map((data, index) => (
                                    <Conneections key={index} {...data} />

                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='p-[5px]'>
                        <div className='rounded bg-gray-100 p-2'>
                            <h1 className='font-bold'>Connections ({talentData.length})</h1>
                            <div className='flex flex-wrap  gap-5'>
                                {talentData.map((data, index) => (
                                    <TalentCards key={index} {...data} />

                                ))}
                            </div>
                        </div>

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

export default NetworkMain;
