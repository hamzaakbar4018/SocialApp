import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import UserDummy from './Like';
// import Comments from './Comments';
const Post = ({ userimage, lastActiveTime, username, title, hashtags, postimage, likesCount, commentCount, shareCount }) => {
    const [likes, setlikes] = useState(false);
    const handleLikes = () => {
        setlikes(!likes)
    }
    const [comments, setComments] = useState(false);
    const handleComments = () => {
        setComments(!comments)
    }

    const commentsData = [
        {
            username: 'JaneDoe',
            userimage: 'https://randomuser.me/api/portraits/women/1.jpg',
            comment: 'This is an amazing post! Love the content and the visuals.',
        },
        {
            username: 'JohnSmith',
            userimage: 'https://randomuser.me/api/portraits/men/2.jpg',
            comment: 'Great job! The design looks fantastic and the information is really helpful.',
        },
        {
            username: 'AliceJohnson',
            userimage: 'https://randomuser.me/api/portraits/women/2.jpg',
            comment: 'I found this post very insightful. Thanks for sharing!',
        },
        {
            username: 'BobBrown',
            userimage: 'https://randomuser.me/api/portraits/men/3.jpg',
            comment: 'Excellent work! The layout is clean and the content is engaging.',
        },
        {
            username: 'EmilyDavis',
            userimage: 'https://randomuser.me/api/portraits/women/3.jpg',
            comment: 'I really enjoyed this post. The details are well-presented and easy to follow.',
        },
    ];

    return (
        <div>
            <div className="main bg-white ">
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
                            boxSizing: "border-box",
                            padding: '0',
                            width: '80vw',
                            maxWidth: '850px',
                        }}
                    >
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <div className='flex '>
                            <div className="left max-w-lg border-r border-gray-400 mb-4">
                                <div className='flex justify-between'>
                                    <div className='flex p-4 gap-2'>
                                        <img className='rounded-full w-16 h-16' src={userimage} alt="User Image" />
                                        <div>
                                            <h2 className='font-bold'>{username}</h2>
                                            <p className='text-gray-400'>{lastActiveTime}</p>
                                        </div>
                                    </div>
                                    <div className='flex m-4 px-3 bg-gray-100 cursor-pointer rounded-full justify-center items-center'>
                                        <HiOutlineDotsVertical className='text-lg' />
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <h2 className='text-wrap break-words'>{title}</h2>
                                    <h2 className='font-semibold space-x-3 text-[#227BCD]'>{hashtags}</h2>
                                </div>

                                <div>
                                    <img src={postimage} className='w-full h-[400px] object-cover' alt="Post Image" />
                                </div>
                                <div className='p-3 mt-4 items-center flex gap-5'>
                                    <div className='flex gap-1'>
                                        <FaRegHeart className='text-2xl cursor-pointer text-[#227BCD]' />
                                        <h1>{likesCount}</h1>
                                    </div>
                                    <div className='flex gap-1'>
                                        <FaRegComment className='text-2xl cursor-pointer text-[#227BCD]' />
                                        <h1>{commentCount}</h1>
                                    </div>
                                    <div className='flex gap-1'>
                                        <TbShare3 className='text-2xl cursor-pointer text-[#227BCD]' />
                                        <h1>{shareCount}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='right w-1/2'>
                                <div className='border-b border-gray-400'>
                                    <h3 className="font-bold p-4 text-lg">Post Comments (14k)</h3>
                                </div>
                                <div className='flex flex-col h-full'>
                                    <div className='flex-1 p-4 overflow-y-auto'>
                                        {commentsData.map((data, index) => (
                                            <div key={index} className='mb-4'>
                                                <div className='flex items-center font-bold gap-2'>
                                                    <img src={data.userimage} className='w-10 h-10 rounded-full' alt="" />
                                                    <h1 className='text-sm'>{data.username}</h1>
                                                </div>
                                                <div>
                                                    <p className='bg-[#B7B8B954] py-1 px-2 my-2 rounded-tr-xl rounded-br-xl rounded-bl-xl'>
                                                        {data.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex gap-2 mb-4 p-2 justify-center items-center'>
                                        <input className='bg-[#1C1C1C14] w-[70%] p-2 rounded-2xl' type="text" placeholder='Add a comment...' />
                                        <button className='bg-[#A5A5A5] rounded-3xl p-2 text-white font-bold text-nowrap'>
                                            Post Now
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </dialog>
            )}

        </div>
    );
};

export default Post;
