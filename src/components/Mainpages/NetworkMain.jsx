import React, { useContext, useEffect, useRef, useState } from 'react';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import TalentCards from '../../Cards/Talent/TalentCards';
import Conneections from '../../Cards/Conneections';
import Sidebar from '../Sidebar.jsx'
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
const NetworkMain = () => {
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

        }
    ]

    const network = true;
    return (
        <div className='flex bg-gray-100'>
            <div className='flex-grow p-[2px] bg-gray-100 '>
            <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
                    <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>My Network</h1>
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
                    <div className={`flex justify-end gap-2 md:gap-5 items-center w-full z-20`}>
                        <div
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
                        </div>

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
                                        <div className="modal-box p-0">
                                            <button
                                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                onClick={handlePopup}
                                            >
                                                ✕
                                            </button>
                                            <div className="border-b mb-3 px-6 pt-6 border-gray-400">
                                                <h3 className="font-bold mb-4 text-lg">Notifications</h3>
                                            </div>
                                            <div className="px-6 flex mb-2 flex-col justify-center gap-2">
                                                {notifyData.map((data, index) => (
                                                    <div className="flex items-center gap-2" key={index}>
                                                        <img
                                                            className="w-12 h-12 rounded-full"
                                                            src={data.image}
                                                            alt="image"
                                                        />
                                                        <div className="flex flex-col justify-center">
                                                            <h1 className="font-semibold">
                                                                {data.username} <span className="font-light">{data.text}</span>
                                                            </h1>
                                                            <p className="text-[#9B9B9B] text-sm">{data.time}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            )
                        }

                    </div>


                </div>
                <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className=' bg-white md:p-4 p-2'>
                            <h1 className='font-bold'>Requests ({reqData.length})</h1>
                            <div className='flex flex-wrap md:gap-3 gap-2 mt-4'>
                                {reqData.map((data, index) => (
                                    <Conneections key={index} {...data} />

                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='md:p-[2px]'>
                        <div className=' bg-white md:p-4 p-2'>
                            <h1 className='font-bold'>Connections ({talentData.length})</h1>
                            <div className='flex justify-center md:justify-start mt-3 flex-wrap md:gap-5 gap-2'>
                                {talentData.map((data, index) => (
                                    <TalentCards key={index} network = {network} {...data} />

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
