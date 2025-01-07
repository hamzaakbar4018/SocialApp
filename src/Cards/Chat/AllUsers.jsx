// AllUsers.jsx
import React from 'react';

const AllUsers = ({ otherName, otherImage, otherID, recentMessage, time, isActive, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-2 cursor-pointer border-b border-gray-300 transition-colors duration-300 ${
                isSelected
                    ? 'bg-[#ECF5FE] border-l-2 border-black'
                    : isActive
                        ? 'bg-[#f5f5f5]' // Changed from 'bg-brown-500' to a neutral color
                        : 'bg-white'
            }`}
        >
            <div className='flex justify-between gap-2'>
                <div className='flex mt-2 gap-2'>
                    <div>
                        <img 
                            src={otherImage} 
                            className='w-14 rounded-full h-14 object-cover' 
                            alt={`${otherName}'s Avatar`} 
                            onError={(e) => { e.target.onerror = null; e.target.src = 'defaultImage.png'; }} // Fallback image
                        />
                    </div>
                    <div className='mb-1'>
                        <h1 className='font-bold tracking-tighter'>{otherName}</h1>
                        <div className='mb-1'>
                            <h2 className={`tracking-tighter ${isActive ? 'font-normal text-gray-600' : 'font-semibold text-gray-800'}`}>
                                {recentMessage.length > 22 ? `${recentMessage.slice(0, 22)}...` : recentMessage}
                            </h2>
                        </div>
                        <p className='text-gray-400 text-sm'>{time}</p>
                    </div>
                </div>

                {/* Uncomment and customize if you have unread message indicators */}
                {/* {msg.unread && (
                    <div className='flex items-center justify-center rounded-full w-7 h-7 mt-2 text-[#399AF3] bg-[#3999f36e]'>
                        <h1 className='text-xs'>{msg.totalmsg}</h1>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default AllUsers;
