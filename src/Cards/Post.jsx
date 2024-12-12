import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import UserDummy from './Like';
import MobileComments from './MobileComments';
import { PostData } from '../Context/PostContext';
import { collection, getDocs } from 'firebase/firestore';
// import Comments from './Comments';
const Post = ({ author, postID, data, image, activity, userDetails, createdAt, likesC, shareCount }) => {
    // const Post = ({ postData, activity }) => {


    const formattedDate = createdAt?.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const [likes, setlikes] = useState(false);
    const handleLikes = () => {
        setlikes(!likes)
    }
    const [comments, setComments] = useState(false);
    const handleComments = () => {
        setComments(!comments)
    }
    const [mobileComments, setMobileComments] = useState(false);
    const handleMobileComments = () => {
        setMobileComments(!mobileComments)
    }
    const handleClick = () => {
        if (window.innerWidth < 640) {
            handleMobileComments();
        } else {
            handleComments();
        }
    };
    const closeLikes = () => {
        setlikes(false);
    }

    const closeComments = () => {
        setComments(false);
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

            <>

                <div className="main bg-white ">
                    <div className='flex p-3'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='flex-shrink-0'>
                                    {
                                        activity ? (<img src={author?.image} className='rounded-full min-w-12  h-12 object-cover' alt="" />) : (
                                            <img src={userDetails?.image} className='rounded-full min-w-12  h-12 object-cover' alt="" />
                                        )
                                    }
                                </div>
                                <div className=''>
                                    {
                                        activity ? (
                                            <h1 className='font-semibold'>{author?.firstName}</h1>

                                        ) : (
                                            <h1 className='font-semibold'>{userDetails?.firstName}</h1>

                                        )
                                    }
                                    <h2 className={`text-gray-400 text-nowrap ${activity && 'md:text-base text-xs'}`}>{formattedDate}</h2>
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
                        <h2>{data}</h2>
                        {/* <h2 className='font-semibold space-x-3 text-[#227BCD]'>#Tags</h2> */}
                    </div>
                    <div className='bg-gray-100'>
                        {image ? (
                            <img
                                className="object-contain min-w-full max-h-[500px]"
                                src={image}
                                alt="Image"
                            />
                        ) : (
                            '')}
                    </div>
                    <div className='p-3 mt-4 items-center flex gap-5'>
                        <div className='flex gap-1'>
                            <FaRegHeart onClick={handleLikes} className='text-2xl cursor-pointer text-[#227BCD]' />
                            <h1>{likesC?.length}</h1>
                        </div>
                        <div className='flex gap-1'>
                            <FaRegComment onClick={handleClick}
                                className='text-2xl cursor-pointer text-[#227BCD]' />
                            {/* <h1></h1> */}
                        </div>
                        <div className='flex gap-1'>
                            <TbShare3 className='text-2xl cursor-pointer text-[#227BCD]' />
                            <h1>{shareCount}</h1>
                        </div>
                    </div>
                </div>
            </>

            {likes && (
                <div className='inset-0 bg-black bg-opacity-65 fixed z-30 flex justify-center items-center'>
                    <div className='z-40'>
                        <dialog id="my_modal_3" className="modal " open>
                            <div className="modal-box p-0">
                                <form method="dialog">
                                    <button onClick={() => setlikes(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className='border-b px-6 pt-6 border-gray-300'>
                                    <h3 className="font-bold mb-4 text-lg">Post Likes({likesC.length})</h3>
                                </div>
                                <UserDummy postID={postID} />
                            </div>
                        </dialog>
                    </div>
                </div>
            )}


            {/*
            {comments && (
                <div className='inset-0 bg-black bg-opacity-65 fixed z-30 flex justify-center items-center'>
                    <dialog id="my_modal_3" className="modal z-40" open>
                        <div
                            className="modal-box h-full 2xl:max-h-[80vh]"
                            style={{
                                boxSizing: "border-box",
                                padding: '0',
                                maxwidth: '80vw',
                                maxWidth: '850px',
                            }}
                        >
                            <form method="dialog">
                                <button onClick={() => setComments(false)} className="btn btn-sm btn-circle z-30 btn-ghost absolute right-2 top-2">✕</button>
                            </form>


                            <div className='flex'>
                                <div className="left hidden md:block fixed top-0 left-0 w-[60%] h-full overflow-y-auto 2xl:overflow-hidden bg-gray-100">
                                    <div className='flex justify-between'>
                                        <div className='flex p-4 gap-2'>
                                            <img className='rounded-full w-16 h-16' src={userimage} alt="User Image" />
                                            <div>
                                                <h2 className='font-bold text-xl'>{username}</h2>
                                                <p className='text-gray-400'>{lastActiveTime}</p>
                                            </div>
                                        </div>
                                        <div className='flex w-10 h-10 m-4 px-3 border cursor-pointer rounded-full justify-center items-center'>
                                            <HiOutlineDotsVertical className='text-lg' />
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <h2 className='text-wrap break-words'>{title}</h2>
                                        <h2 className='font-semibold space-x-3 text-[#227BCD]'>{hashtags}</h2>
                                    </div>

                                    <div>
                                        <img src={postimage} className='w-full h-[350px] object-cover' alt="Post Image" />
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

                                <div className='right md:fixed top-0 right-0 md:w-[40%] h-full overflow-y-auto bg-white md:p-4'>
                                    <div className='md:px-0 md:py-0 px-3 py-2 border-b border-gray-400'>
                                        <h3 className="font-bold p-4 text-lg">Post Comments ({commentsData.length})</h3>
                                    </div>
                                    <div className='flex md:p-0 p-4 flex-col'>
                                        <div className='flex-1 md:p-2'>
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
                                            <button className='md:bg-[#A5A5A5] bg-black rounded-3xl p-2 text-white font-bold text-nowrap'>
                                                Post Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </dialog>
                </div>
            )}


             {
                mobileComments && (
                   <MobileComments commentsData={commentsData} mobileComments={mobileComments} setMobileComments={setMobileComments}/>
                )
            } */}

        </div>
    );
};

export default Post;
