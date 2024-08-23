import React from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
const Post = ({ userimage, lastActiveTime, username, title, hashtags, postimage, likesCount, commentCount, shareCount }) => {
    return (
        <div>
            <div className="main bg-gray-100 rounded-lg">
                <div className='flex p-3'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <img src={userimage} className='rounded-full w-12 h-12 ' alt="" />
                            <div className=''>
                                <h1 className='font-semibold'>{username}</h1>
                                <h2 className='text-gray-400 text-nowrap'>{lastActiveTime}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex font-bold text-2xl w-full justify-end'>
                        <div className='p-3 bg-gray-100 cursor-pointer rounded-full justify-center items-center'>
                            <HiOutlineDotsVertical className='text-lg' />
                        </div>
                    </div>
                </div>
                <div className='p-3'>
                    <h2>{title}</h2>
                    <h2 className='font-semibold space-x-3 text-[#227BCD]'>{hashtags}</h2>
                </div>
                <div>
                    <img src={postimage} alt="" />
                </div>
                <div className='p-3 mt-4 items-center flex gap-5'>
                    <div className='flex gap-1'>
                        <FaRegHeart className='text-2xl text-[#227BCD]' />
                        <h1>{likesCount}</h1>
                    </div>
                    <div className='flex gap-1'>
                        <FaRegComment className='text-2xl text-[#227BCD]' />
                        <h1>{commentCount}</h1>
                    </div>
                    <div className='flex gap-1'>
                        <TbShare3 className='text-2xl text-[#227BCD]' />
                        <h1>{shareCount}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
