import React from 'react';

const AllUsers = ({ userImg, username, msg, time, received, isActive, isSelected, onClick }) => {
    const displayMessage = received.msg && received.received ? received.msg : msg.text;

    return (
        <div
            onClick={onClick}
            className={`p-2 cursor-pointer rounded border-b border-gray-300 transition-colors duration-300 ${
                isSelected ? 'bg-[#ECF5FE]' : (isActive ? 'bg-brown-500' : 'bg-white')
            }`}
        >
            <div className='flex justify-between gap-2'>
                <div className='flex mt-2 gap-2'>
                    <div>
                        <img src={userImg} className='w-14 rounded-full h-14' alt="UserImage" />
                    </div>
                    <div className='mb-1'>
                        <h1 className='font-bold tracking-tighter'>{username}</h1>
                        {msg.unread ? (
                            <h2 className='tracking-tighter font-bold'>{displayMessage.slice(0, 22)}.</h2>
                        ) : (
                            <h2 className='tracking-tighter text-gray-400'>{displayMessage.slice(0, 22)}.</h2>
                        )}
                        <p className='text-gray-400 text-sm'>{time}</p>
                    </div>
                </div>

                {msg.unread && (
                    <div className='flex items-center justify-center rounded-full w-7 h-7 mt-2 text-[#399AF3] bg-[#3999f36e]'>
                        <h1 className='text-xs'>{msg.totalmsg}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
