import React, { useState,useEffect,useRef } from 'react';
import Arrow from '../../assets/Icons SVG/Arrow.svg'
import Rightbar from '../Rightbar';
import searchi from '../../assets/Icons SVG/Search.svg'
import Notifications from '../../assets/Icons SVG/Notifications.svg'
const PrivacyMain = () => {
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



    return (
        <div className='flex'>
            <div className='flex-grow p-[2px] bg-gray-100'>
                <div className='flex  px-0 justify-between bg-white items-center border-b py-4'>
                <h1 className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold p-3'}`}>Privicy Policy</h1>
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
                    <div className='mt-[2px]'>
                        <div className='bg-white p-4'>
                            <div>
                                <h1 className=' font-bold'>Privacy Policy</h1>
                                <div className='mt-3'>
                                    <h2 className='font-bold'>1.Introduction</h2>
                                    <p className='text-gray-400 mt-2'>
                                        At YouTooArt, we believe in the transformative power of art to inspire and connect people across the globe. Our mission is to create a platform that celebrates creativity, fosters artistic expression, and brings unique artworks to a broader audience. Whether you're an artist looking to showcase your work or an art enthusiast searching for something extraordinary, we're here to support and elevate your artistic journey.
                                    </p>

                                </div>
                                
                            </div>
                            <div className='mt-5'>
                                <div className='mt-3'>
                                    <h2 className='font-bold'>2.Information We Collect</h2>
                                    <p className='text-gray-400 mt-2'>
                                        At YouTooArt, we believe in the transformative power of art to inspire and connect people across the globe. Our mission is to create a platform that celebrates creativity, fosters artistic expression, and brings unique artworks to a broader audience. Whether you're an artist looking to showcase your work or an art enthusiast searching for something extraordinary, we're here to support and elevate your artistic journey.
                                    </p>

                                </div>
                            </div>
                            <div className='mt-5'>
                                <div className='mt-3'>
                                    <h2 className='font-bold'>3.Sharing</h2>
                                    <p className='text-gray-400 mt-2'>
                                        At YouTooArt, we believe in the transformative power of art to inspire and connect people across the globe. Our mission is to create a platform that celebrates creativity, fosters artistic expression, and brings unique artworks to a broader audience. Whether you're an artist looking to showcase your work or an art enthusiast searching for something extraordinary, we're here to support and elevate your artistic journey.
                                    </p>

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

export default PrivacyMain;
