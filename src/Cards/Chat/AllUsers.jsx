import React from 'react';

const AllUsers = ({ userImg, username, msg, received, sent, time, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-2 cursor-pointer rounded transition-colors duration-300 ${isActive ? 'bg-brown-500' : 'bg-white'}`}
        >
            <div className='flex border-b border-gray-300 justify-between gap-2'>
                <div className='flex mt-2 gap-2'>
                    <div>
                        <img src={userImg} className='w-14 rounded-full h-14' alt="UserImage" />
                    </div>
                    <div className='mb-1'>
                        <h1 className='font-bold tracking-tighter'>{username}</h1>
                        {msg.unread ? (
                            <h2 className='tracking-tighter font-bold'>{msg.text.slice(0, 22)}.</h2>
                        ) : (
                            <h2 className='tracking-tighter text-gray-400'>{msg.text.slice(0, 22)}.</h2>
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
}

export default AllUsers;
