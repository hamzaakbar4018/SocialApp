import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { RiShareForwardLine } from 'react-icons/ri';
import SharePopup from '../SharePopup';

const UserCard = ({ 
    title, 
    img, 
    type, 
    duration, 
    location, 
    budget, 
    description, 
    username, 
    city, 
    isSelected, 
    landingpage, 
    apply, 
    mycasting, 
    date, 
    castingtab, 
    age, 
    day, 
    crew, 
    height, 
    gender, 
    des, 
    deletepop,
    id 
}) => {
    const dayDate = date && date.toDate ? date.toDate().toLocaleDateString('en-US', { weekday: 'long' }) : 'Unknown Date';
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [showShare, setShowShare] = useState(false);

    const handleApplyClick = () => {
        if (!currentUser) {
            navigate('/login');
        } else {
            navigate('/casting/calls');
        }
    };

    const getCallUrl = () => {
        const baseUrl = 'https://cinetroop.com' || window.location.origin;
        return `${baseUrl}/casting/calls/${id}`;
    };

    return (
        <div className={`cursor-pointer p-4 ${deletepop ? '!bg-[#E6E7E854] p-0' : ''} ${castingtab ? '!bg-[#E6E7E854]' : ''} ${apply && '!bg-gray-100'} ${landingpage && 'md:w-full w-auto min-h-full rounded-2xl'}  ${isSelected ? 'bg-[#ECF5FE] border-l-2 border-gray-700' : 'bg-white'}`}>
            <div className='flex justify-between'>
                <div className="flex items-center gap-2">
                    {!mycasting && (
                        <div className="flex-shrink-0">
                            <img
                                src={img}
                                className="w-12 h-12 rounded-full object-cover"
                                alt=""
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-xl text-wrap 2xl:text-xl font-semibold">{title}</h1>
                        {mycasting ? (
                            <p className="text-gray-400">Published, {dayDate}</p>
                        ) : (
                            <p className="text-gray-400">{username}</p>
                        )}
                    </div>
                </div>

                {!(landingpage || apply) && (
                    <RiShareForwardLine
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            setShowShare(true);
                        }}
                        className="text-3xl text-gray-400 cursor-pointer hover:text-gray-600"
                    />
                )}
            </div>
            
            <div className='my-4 mx-2 2xl:mt-7 2xl:mb-7 2xl:text-xl'>
                {landingpage && <p>{description}</p>}
            </div>
            
            <div className={`flex gap-16 2xl:text-xl  mt-3 ${landingpage && 'bg-gradient-to-r from-[#F4F4F4] to-[#FFFFFF00] gap-20 bg border-l-2 flex justify-start border-black'}  items-center`}>
                <div className={`${mycasting ? 'md:ml-0' : 'md:ml-7 ml-4'}`}>
                    <div>
                        <h2 className='text-gray-400'>Location</h2>
                        <h1 className='font-bold'>{location ? location : "N/A"}</h1>
                    </div>
                    <div>
                        <h2 className='text-gray-400'>Type</h2>
                        <h1 className='font-bold'>{type ? type : "N/A"}</h1>
                    </div>
                </div>
                <div className={`${mycasting ? 'md:ml-0' : 'md:ml-0 ml-4'}`}>
                    <div>
                        <h2 className='text-gray-400'>Shoot</h2>
                        <h1 className='font-bold'>{day ? day + ' Days' : "N/A"}</h1>
                    </div>
                    <div>
                        <h2 className='text-gray-400'>Budget</h2>
                        <h1 className='font-bold'>{budget ? budget : "N/A"}</h1>
                    </div>
                </div>
            </div>

            {landingpage && (
                <button
                    onClick={handleApplyClick}
                    className="p-3 w-full md:w-auto rounded-3xl bg-black text-white mt-5"
                >
                    Apply Now
                </button>
            )}

            {showShare && (
                <SharePopup
                    url={getCallUrl()}
                    onClose={() => {
                        setShowShare(false);
                    }}
                />
            )}
        </div>
    );
};

export default UserCard;