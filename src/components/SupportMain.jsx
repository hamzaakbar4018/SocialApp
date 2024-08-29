import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Rightbar from './Rightbar';
import { FaArrowCircleRight } from 'react-icons/fa';
import land6plus from '../assets/Images/down.svg'
import land6minus from '../assets/Images/up.svg'
const SupportMain = () => {
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);

    const handleBar = () => {
        setShowRightbar(!showRightbar);
    };
    const [visibleSections, setVisibleSections] = useState([false, false, false, false, false, false]);

    const handleVisible = (index) => {
        setVisibleSections(prevState =>
            prevState.map((visible, i) => i === index ? !visible : visible)
        );
    };
    const handleSearch = () => {
        console.log("Search button clicked");
        setSearch(!search);
    };


    return (
        <div className='flex'>
            <div className='flex-grow'>
                <div className='flex px-0 justify-between items-center border-b py-4'>
                    <h1 className='text-xl p-3'>Help & Support</h1>
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
                <div className={`showcard transition-all ${showRightbar ? 'm-[]' : 'mr-[1%]'}`}>
                    <div className='p-[5px]'>
                        <div className='rounded bg-gray-100 p-4'>
                            <h1 className='font-bold text-gray-400'>Frequently Asked Questions</h1>


                            <div className="details flex flex-col">
                                <div className="one mt-7 border-b border-gray-300 flex w-full">
                   
                                    <div className="data w-full">
                                        <h1 className='changes text-xl mb-4'>What is youtooart.com about?</h1>
                                        {visibleSections[0] && <p className='changes text-sm mb-4 text-gray-500'>
                                            Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
                                        </p>}
                                    </div>
                                    <div className="w-[20%] flex justify-end items-start">
                                        {!visibleSections[0] ?
                                            <button onClick={() => handleVisible(0)} className='changes '><img className='w-5' src={land6plus} style={{ filter: 'invert(44%) sepia(4%) saturate(2457%) hue-rotate(171deg) brightness(92%) contrast(92%)' }} alt="" /></button> :
                                            <button onClick={() => handleVisible(0)} className='changes '><img className='w-5' src={land6minus} alt="" /></button>
                                        }
                                    </div>
                                </div>

                                <div className="two mt-7 border-b border-gray-300 flex w-full">
                     
                                    <div className="data w-full">
                                        <h1 className='changes text-xl mb-4'>How does youtooart.com work?</h1>
                                        {visibleSections[1] && <p className='changes text-sm mb-4 text-gray-500'>
                                            Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
                                        </p>}
                                    </div>
                                    <div className="w-[20%] flex justify-end items-start">
                                        {!visibleSections[1] ?
                                            <button onClick={() => handleVisible(1)} className='changes '><img className='w-5' src={land6plus} style={{ filter: 'invert(44%) sepia(4%) saturate(2457%) hue-rotate(171deg) brightness(92%) contrast(92%)' }} alt="" /></button> :
                                            <button onClick={() => handleVisible(1)} className='changes '><img className='w-5' src={land6minus} alt="" /></button>
                                        }
                                    </div>
                                </div>

                                <div className="three mt-7 border-b border-gray-300 flex w-full">
                           
                                    <div className="data w-full">
                                        <h1 className='changes text-xl mb-4'>How does youtooart.com help a certain user with a particular interest in some art category?</h1>
                                        {visibleSections[2] && <p className='changes text-sm mb-4 text-gray-500'>
                                            Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
                                        </p>}
                                    </div>
                                    <div className="w-[20%] flex justify-end items-start">
                                        {!visibleSections[2] ?
                                            <button onClick={() => handleVisible(2)} className='changes '><img className='w-5' src={land6plus} style={{ filter: 'invert(44%) sepia(4%) saturate(2457%) hue-rotate(171deg) brightness(92%) contrast(92%)' }} alt="" /></button> :
                                            <button onClick={() => handleVisible(2)} className='changes '><img className='w-5' src={land6minus} alt="" /></button>
                                        }
                                    </div>
                                </div>

                                <div className="four mt-7 border-b border-gray-300 flex w-full">
                      
                                    <div className="data w-full">
                                        <h1 className='changes text-xl mb-4'>How does youtooart.com help people who are trying to perceive a full-time career in arts?</h1>
                                        {visibleSections[3] && <p className='changes text-sm mb-4 text-gray-500'>
                                            Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
                                        </p>}
                                    </div>
                                    <div className="w-[20%] flex justify-end items-start">
                                        {!visibleSections[3] ?
                                            <button onClick={() => handleVisible(3)} className='changes '><img className='w-5' src={land6plus} style={{ filter: 'invert(44%) sepia(4%) saturate(2457%) hue-rotate(171deg) brightness(92%) contrast(92%)' }} alt="" /></button> :
                                            <button onClick={() => handleVisible(3)} className='changes '><img className='w-5' src={land6minus} alt="" /></button>
                                        }
                                    </div>
                                </div>

                                <div className="five mt-7 border-b border-gray-300 flex w-full">
                      
                                    <div className="data w-full">
                                        <h1 className='changes text-xl mb-4'>Anything else from Youtooart.com?</h1>
                                        {visibleSections[4] && <p className='changes text-sm mb-4 text-gray-500'>
                                            Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
                                        </p>}
                                    </div>
                                    <div className="w-[20%] flex justify-end items-start">
                                        {!visibleSections[4] ?
                                            <button onClick={() => handleVisible(4)} className='changes '><img className='w-5' src={land6plus} style={{ filter: 'invert(44%) sepia(4%) saturate(2457%) hue-rotate(171deg) brightness(92%) contrast(92%)' }} alt="" /></button> :
                                            <button onClick={() => handleVisible(4)} className='changes '><img className='w-5' src={land6minus} alt="" /></button>
                                        }
                                    </div>
                                </div>
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

export default SupportMain;
