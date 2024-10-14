import React, { useEffect, useRef, useState } from 'react';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import TalentCards from '../../Cards/Talent/TalentCards';
import Conneections from '../../Cards/Conneections';
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
            connect:true
            
        },
        {
            id: 2,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Jane Smith",
            text: "Model | Director",
            connect:true
        },
        {
            id: 3,
            userpic: "https://randomuser.me/api/portraits/men/12.jpg",
            name: "Michael Johnson",
            text: "Actor | Director",
            connect:true
        },
        {
            id: 4,
            userpic: "https://randomuser.me/api/portraits/women/13.jpg",
            name: "Emily Davis",
            text: "Model",
            connect:true
        },
        {
            id: 5,
            userpic: "https://randomuser.me/api/portraits/men/14.jpg",
            name: "Chris Brown",
            text: "Actor",
            connect:true
        },
        {
            id: 6,
            userpic: "https://randomuser.me/api/portraits/women/15.jpg",
            name: "Sophia Wilson",
            text: "Director",
            connect:true
        },
        {
            id: 7,
            userpic: "https://randomuser.me/api/portraits/men/16.jpg",
            name: "David Miller",
            text: "Actor | Model | Director",
            connect:true
        },
        {
            id: 8,
            userpic: "https://randomuser.me/api/portraits/women/17.jpg",
            name: "Olivia Taylor",
            text: "Model | Actor",
            connect:true
        },
    ];
    const reqData = [
        {
            "image": "https://randomuser.me/api/portraits/men/10.jpg",
            "username": "michael_scott",
            "description": "1 day ago",
            network:true

        },
        {
            "image": "https://randomuser.me/api/portraits/women/20.jpg",
            "username": "pam_beesly",
            "description": "Just Now",
            network:true

        },
        {
            "image": "https://randomuser.me/api/portraits/men/30.jpg",
            "username": "jim_halpert",
            "description": "2 hours ago",
            network:true

        },
    ]


    return (
        <div className='flex bg-gray-100'>
            <div className='flex-grow p-[2px] bg-gray-100 '>
                <div className='flex bg-white px-0 justify-between items-center border-b py-4'>
                <h1 className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold p-3'}`}>My Network</h1>
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
                <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className=' bg-white p-4'>
                            <h1 className='font-bold'>Requests ({reqData.length})</h1>
                            <div className='flex flex-wrap gap-3 mt-4'>
                                {reqData.map((data, index) => (
                                    <Conneections key={index} {...data} />

                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='p-[2px]'>
                        <div className=' bg-white p-4'>
                            <h1 className='font-bold'>Connections ({talentData.length})</h1>
                            <div className='flex mt-3 flex-wrap gap-5'>
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
