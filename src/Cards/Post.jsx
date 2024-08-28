import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import UserDummy from './Like';
import Comments from './Comments';
const Post = ({ userimage, lastActiveTime, username, title, hashtags, postimage, likesCount, commentCount, shareCount }) => {
    const [likes, setlikes] = useState(false);
    const handleLikes = () => {
        setlikes(!likes)
    }
    const [comments, setComments] = useState(false);
    const handleComments = () => {
        setComments(!comments)
    }
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
                        <div className='flex px-3 bg-white cursor-pointer rounded-full justify-center items-center'>
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
                        <FaRegHeart onClick={handleLikes} className='text-2xl cursor-pointer text-[#227BCD]' />
                        <h1>{likesCount}</h1>
                    </div>
                    <div className='flex gap-1'>
                        <FaRegComment onClick={handleComments} className='text-2xl cursor-pointer text-[#227BCD]' />
                        <h1>{commentCount}</h1>
                    </div>
                    <div className='flex gap-1'>
                        <TbShare3 className='text-2xl cursor-pointer text-[#227BCD]' />
                        <h1>{shareCount}</h1>
                    </div>
                </div>
            </div>
            {likes && (
                <dialog id="my_modal_3" className="modal" open>
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className='border-b border-gray-400'>
                            <h3 className="font-bold mb-4 text-lg">Post Likes(141.2k)</h3>
                        </div>
                        <UserDummy />
                    </div>
                </dialog>
            )}

            {comments && (
                <dialog id="my_modal_3" className="modal" open>
                    <div
                        className="modal-box"
                        style={{
                            width: '80vw',
                            maxWidth: '850px', 
                        }}
                    >
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <Comments />
                    </div>
                </dialog>
            )}

        </div>
    );
};

export default Post;
