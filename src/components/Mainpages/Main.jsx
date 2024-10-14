import React, { useEffect, useRef, useState } from 'react';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import photoadmin from '../../assets/Icons SVG/photoadmin.svg';
import textadmin from '../../assets/Icons SVG/textadmin.svg';
import tag from '../../assets/Icons SVG/tag.svg';
import Post from '../../Cards/Post';
import '../../CSS/Connections.css';
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import postpic from '../../assets/Icons SVG/postpic.png';

const Main = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [postModel, setPostModel] = useState(false);
    const [tagPeople, setTagPeople] = useState(false);
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

    const handleTagPeople = () => {
        setTagPeople(!tagPeople);
        setPostModel(false);
    }
    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handlePostModel = () => {
        setPostModel(!postModel);
        setTagPeople(false);
    };

    const admin = [
        {
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            username: "michael_scott",
            description: "Actor"
        }
    ];

    const postData = [
        {
            userimage: "https://randomuser.me/api/portraits/men/1.jpg",
            lastActiveTime: "2024-08-20T14:30:00Z",
            username: "Hamza",
            title: "Hi Guys! Something interesting is on it’s way! 3 Days to Go.",
            hashtags: ["#travel", " #adventure"],
            postimage: postpic,
            likesCount: 120,
            commentCount: 35,
            shareCount: 22
        },
        {
            "userimage": "https://randomuser.me/api/portraits/women/2.jpg",
            "lastActiveTime": "2024-08-19T09:15:00Z",
            "username": "jane_smith",
            "hashtags": ["#foodie", "#recipe"],
            "postimage": postpic,
            "likesCount": 98,
            "commentCount": 42,
            "shareCount": 18
        },
        {
            "userimage": "https://randomuser.me/api/portraits/men/3.jpg",
            "lastActiveTime": "2024-08-18T11:45:00Z",
            "username": "mark_twain",
            "hashtags": ["#fitness", "#health"],
            "postimage": postpic,
            "likesCount": 150,
            "commentCount": 50,
            "shareCount": 30
        },
        {
            "userimage": "https://randomuser.me/api/portraits/women/4.jpg",
            "lastActiveTime": "2024-08-17T16:00:00Z",
            "username": "emily_rose",
            "hashtags": ["#fashion", "#style"],
            "postimage": postpic,
            "likesCount": 200,
            "commentCount": 60,
            "shareCount": 40
        },
        {
            "userimage": "https://randomuser.me/api/portraits/men/5.jpg",
            "lastActiveTime": "2024-08-16T08:30:00Z",
            "username": "alexander_hamilton",
            "hashtags": ["#tech", "#innovation"],
            "postimage": postpic,
            "likesCount": 85,
            "commentCount": 20,
            "shareCount": 15
        }
    ];

    const postingData = [
        {
            "userimage": "https://randomuser.me/api/portraits/men/1.jpg",
            "username": "Hamza",
            "title": "Creating Post"
        }
    ]

    const handleSearch = () => {
        console.log("Search button clicked");
        setSearch(!search);
    }
    return (
        <div className='flex'>
            <div className='flex-grow p-[2px] bg-gray-100'>
                <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
                <h1 className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold p-3'}`}>Hi Ali!</h1>
                    {search && (
                        <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
                    )}
                    <div className={`flex justify-end gap-5 items-center w-full z-20`}>
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
                <div className={`transition-all ${showRightbar ? 'm-[]' : 'mr-[2px]'}`}>
                    <div className='p-[2px]'>
                        <div className='bg-white p-4'>
                            {admin.map((data, index) => (
                                <div key={index}>
                                    <div className='flex gap-4 items-center'>
                                        <img src={data.image} className='rounded-full w-12 h-12' alt={data.username} />
                                        <p className='text-[#808080]'>Have You Something to Share?</p>
                                    </div>
                                    <div className='flex items-center mt-5 gap-5 p-2'>
                                        <div onClick={handlePostModel} className='flex bg-[#399AF31A] px-3 py-2 rounded-3xl gap-2 cursor-pointer items-center'>
                                            <img src={photoadmin} className='w-5 mb-1 mt-1' alt="photo" />
                                            <button className='' onClick={handlePostModel}>Photo</button>
                                        </div>
                                        <div className='flex bg-[#FF602E1A] px-3 py-2 rounded-3xl cursor-pointer gap-1 justify-center items-center'>
                                            <img src={textadmin} className='w-5 mb-1' alt="text" />
                                            <button>Text</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='rounded mt-2'>
                            <div className='flex flex-col gap-3'>
                                {postData.map((data, index) => (
                                    <Post key={index} {...data} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Models */}



            {showRightbar && (
                <div className='w-[26%]'>
                    <Rightbar />
                </div>
            )}
            {postModel && (
                <div className='fixed inset-0 bg-black z-40 bg-opacity-65 flex justify-center items-center'>


                    <dialog id="my_modal_3" className="modal z-90" open>
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handlePostModel}>✕</button>
                            </form>
                            <div>
                                <div className=''>
                                    {postingData.map((data, index) => (
                                        <div>
                                            <div className="content flex gap-2">
                                                <div key={index}>
                                                    <img src={data.userimage} className='rounded-full w-12' alt="" />
                                                </div>
                                                <div className='items-center'>
                                                    <h1 className='font-semibold'>{data.username}</h1>
                                                    <h1 className='text-gray-400'>{data.title}</h1>
                                                </div>
                                            </div>
                                            <div className='mt-5 h-48'>
                                                <h1 className='text-gray-400'>Write your thoughts here...</h1>
                                            </div>
                                            <div className='flex gap-3'>
                                                <div className='flex bg-[#399AF31A] px-3 py-2 rounded-3xl gap-1'>
                                                    <img className='w-5' src={photoadmin} alt="" />
                                                    <button>
                                                        Photo
                                                    </button>
                                                </div>
                                                <div className='flex bg-[#FF602E1A] px-3 py-2 rounded-3xl gap-1'>
                                                    <img className='w-5' src={tag} alt="" />
                                                    <button>
                                                        Tag People
                                                    </button>
                                                </div>
                                                <div onClick={handleTagPeople} className='flex-grow flex justify-end'>
                                                    <button className='p-3 rounded-3xl bg-black text-white'>Post Now</button>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {tagPeople && <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box h-80 w-96">
                    <form method="dialog">
                        <button onClick={handleTagPeople} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex gap-1'>
                        <button onClick={handlePostModel}>
                            <IoMdArrowBack className='text-2xl' />
                        </button>
                        <h3 className="font-bold text-lg">Tag People</h3>
                    </div>
                    <div className='flex justify-start mt-2 bg-gray-100  rounded-xl items-center'>
                        <IoIosSearch className='ml-3' />
                        <input className='outline-none w-full bg-transparent p-2' type="search" name="" placeholder='Search' id="" />
                    </div>

                </div>
            </dialog>}
        </div>
    );
};

export default Main;