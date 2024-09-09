import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Rightbar from '../Rightbar';
import { FaArrowCircleRight } from 'react-icons/fa';
import AllUsers from '../../Cards/Chat/AllUsers';
import UsersChat from '../../Cards/Chat/UsersChat';

const ChatMain = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
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

    const dummyData = [
        {
            userImg: "https://randomuser.me/api/portraits/men/1.jpg",
            username: "Muhammad Ali",
            msg: {
                unread: true,
                text: "Hello how are you?",
                totalmsg: '1',
            },
            received: {
                received: true,
                msg: 'Hello this is test msg for receiving.'
            },
            sent: {
                sent: true,
                msg: 'Hello this is test msg for sending.'
            },
            time: "2 hours ago",
        },
        {
            userImg: "https://randomuser.me/api/portraits/women/2.jpg",
            username: "Saira",
            msg: {
                unread: false,
                text: "I am fine, thanks!",
                totalmsg: '4',
            },
            received: {
                received: false,
                msg: ''
            },
            sent: {
                sent: true,
                msg: 'Glad to hear from you!'
            },
            time: "30 minutes ago",
        },
        {
            userImg: "https://randomuser.me/api/portraits/men/3.jpg",
            username: "Abuzar",
            msg: {
                unread: true,
                text: "Haha hell yeh",
                totalmsg: '2',
            },
            received: {
                received: true,
                msg: 'I agree with you!'
            },
            sent: {
                sent: true,
                msg: 'That\'s awesome!'
            },
            time: "1 day ago",
        },
        {
            userImg: "https://randomuser.me/api/portraits/women/4.jpg",
            username: "Sara",
            msg: {
                unread: true,
                text: "Are you available for a meeting?",
                totalmsg: '5',
            },
            received: {
                received: false,
                msg: ''
            },
            sent: {
                sent: true,
                msg: 'I will get back to you soon.'
            },
            time: "3 hours ago",
        },
        {
            userImg: "https://randomuser.me/api/portraits/men/5.jpg",
            username: "John Doe",
            msg: {
                unread: false,
                text: "Let’s catch up this weekend.",
                totalmsg: '3',
            },
            received: {
                received: true,
                msg: 'Looking forward to it!'
            },
            sent: {
                sent: true,
                msg: 'Sure, let\'s plan for it.'
            },
            time: "5 days ago",
        }
    ];

    return (
        <div className='flex'>
            <div className='flex-grow'>
                <div className='flex px-0 justify-between items-center border-b py-4'>
                    <h1 className='text-xl p-3'>Chat</h1>
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
                <div className={`showcard transition-all ${showRightbar ? 'mr-[26%]' : 'mr-0'}`}>
                    <div className='p-[5px] bg-gray-100'>
                        <div className="rounded gap-1 w-full flex">
                            <div className='left bg-white min-w-[30%] rounded'>
                                {dummyData.map((data, index) => (
                                    <AllUsers
                                        key={index}
                                        {...data}
                                        isActive={selectedCardIndex === index}
                                        isSelected={selectedCardIndex === index}
                                        onClick={() => setSelectedCardIndex(index)}
                                    />
                                ))}
                            </div>
                            <div className='right flex-shrink-0 rounded flex-grow'>
                                {selectedCardIndex !== null && (
                                    <UsersChat
                                        userImg={dummyData[selectedCardIndex].userImg}
                                        username={dummyData[selectedCardIndex].username}
                                        sent={dummyData[selectedCardIndex].sent}
                                        received={dummyData[selectedCardIndex].received}
                                        time={dummyData[selectedCardIndex].time}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
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

export default ChatMain;
