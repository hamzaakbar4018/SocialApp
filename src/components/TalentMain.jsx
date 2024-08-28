import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Rightbar from './Rightbar';
import admin from '../assets/Images/photoadmin.svg';
import { FaArrowCircleRight } from 'react-icons/fa';
import TalentCards from '../Cards/Talent/TalentCards';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const TalentMain = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);

    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };

    const handleSearch = () => {
        console.log("Search button clicked");
        setSearch(!search);
    };

    const talentData = [
        {
            "id": 1,
            "userpic": "https://randomuser.me/api/portraits/men/1.jpg",
            "name": "John Doe",
            "text": "Actor | Model"
        },
        {
            "id": 2,
            "userpic": admin,
            "name": "Jane Smith",
            "text": "Model | Director"
        },
        {
            "id": 3,
            "userpic": "https://randomuser.me/api/portraits/men/12.jpg",
            "name": "Michael Johnson",
            "text": "Actor | Director"
        },
        {
            "id": 4,
            "userpic": "https://randomuser.me/api/portraits/women/13.jpg",
            "name": "Emily Davis",
            "text": "Model"
        },
        {
            "id": 5,
            "userpic": "https://randomuser.me/api/portraits/men/14.jpg",
            "name": "Chris Brown",
            "text": "Actor"
        },
        {
            "id": 6,
            "userpic": "https://randomuser.me/api/portraits/women/15.jpg",
            "name": "Sophia Wilson",
            "text": "Director"
        },
        {
            "id": 7,
            "userpic": "https://randomuser.me/api/portraits/men/16.jpg",
            "name": "David Miller",
            "text": "Actor | Model | Director"
        },
        {
            "id": 8,
            "userpic": "https://randomuser.me/api/portraits/women/17.jpg",
            "name": "Olivia Taylor",
            "text": "Model | Actor"
        }
    ];

    return (
        <div className='flex'>
            <div className='flex-grow'>
                <div className='flex px-0 justify-between items-center border-b py-4'>
                    <h1 className='text-xl p-3'>Talent</h1>
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
                <div className={`showcard transition-all max-w-[60%] ${showRightbar ? 'm-[]' : 'mr-[1%]'}`}>
                    <div className='p-[5px]'>
                        <div className='rounded bg-gray-100 p-4'>
                            <h3>People in Drama Industry</h3>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={10}
                                slidesPerView={5}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                                className="swiper-container"
                            >
                                {talentData.map((data) => (
                                    <SwiperSlide key={data.id} className='min-w-min'>
                                        <TalentCards {...data} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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

export default TalentMain;
