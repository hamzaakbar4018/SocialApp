import React from 'react';
import Edit from '../../assets/Icons SVG/Edit.svg'
import Add from '../../assets/Icons SVG/Add.svg'
const MyWorkPictures = ({ pictures }) => {
    return (
        <div className='alldata w-full bg-white m-[2px] rounded p-6'>
            {/* Pictures Section */}
            <div className="pictures">
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex-1'>
                        <h1 className='text-xl font-semibold'>Pictures ({pictures.length})</h1>
                        <p className='text-sm text-gray-400'>1 Hour ago</p>
                    </div>
                    <div className='text-blue-500 cursor-pointer'>
                        <div className='flex gap-2'>
                            <div className='rounded-full flex justify-center items-center  p-3 bg-[#D6EBFF]'>
                                <img src={Edit} className='w-7 h-7' />
                            </div>
                            <div className='bg-[#B3FCE2] rounded-full flex justify-center items-center p-3'>
                                <img src={Add} className='w-7 h-7' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel with Half-Width Items */}
                <div className="carousel flex gap-4 overflow-x-auto">
                    {pictures.length > 0 ? (
                        pictures.map((picture, index) => (
                            <div key={index} className="carousel-item border rounded-lg w-full md:w-1/3 p-2 flex-shrink-0">
                                <div className='flex flex-col items-start'>
                                    <img src={picture.thumbnail} alt={picture.title} className='w-full h-40 md:h-auto object-cover rounded mb-4' />
                                    <div>
                                        <h2 className='text-lg 2xl:text-xl font-semibold mb-2'>{picture.title}</h2>
                                        <a href={picture.pictureLink} target="_blank" rel="noopener noreferrer" className='text-blue-400 2xl:text-xl underline'>
                                            picture.pictureLink
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No pictures available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyWorkPictures;
