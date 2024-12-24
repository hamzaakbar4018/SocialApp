import React, { useState } from 'react';
import { FaUsers } from "react-icons/fa6";
import { BsPostcardHeart } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";
import { HiOutlineDotsVertical } from 'react-icons/hi';
import useAuthor from '../../Hooks/useAuthor';
import EditProfileModal from './EditProfileModal';

const ProfileCard = () => {
    const { authorInfo, fetchAuthorAndPosts } = useAuthor();
    const { author, posts, loading, error } = authorInfo;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleProfileUpdate = async () => {
        await fetchAuthorAndPosts(); 
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    return (
        <>
            <div className='p-6 md:flex md:flex-row flex flex-col justify-center md:justify-between md:items-start items-center gap-3'>
                <img src={author?.image || 'https://example.com/path/to/defaultanonymousimage.png'}
                    alt=""
                    className='rounded-full max-w-36 h-36 border' />
                <div className='w-full flex flex-col items-center md:items-start'>
                    <h1 className='font-bold text-xl'>{author?.firstName}</h1>
                    <p className='text-gray-400 max-w-[70%]'>{author?.bio}</p>
                    <div className='mt-5 flex gap-4'>
                        <div className='px-3 py-2 rounded-full border flex items-center gap-2'>
                            <div className='rounded-full text-2xl p-4 text-[#008F5C] bg-[#B3FCE2]'>
                                <FaUsers />
                            </div>
                            <div className=''>
                                <h2 className='text-gray-400'>Connects</h2>
                                <p>{author?.friends?.length || 0}</p>
                            </div>
                        </div>

                        <div className='flex px-3 py-2 rounded-full border items-center gap-2'>
                            <div className='rounded-full text-2xl p-4 text-[#399AF3] bg-[#D6EBFF]'>
                                <BsPostcardHeart />
                            </div>
                            <div className=''>
                                <h2 className='text-gray-400'>Posts</h2>
                                <p>{posts?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-[30%]'>
                    <div className='flex gap-3 justify-center md:justify-end md:items items-center'>
                        <button
                            onClick={() => document.getElementById('edit_modal').showModal()}
                            className='flex justify-center w-full items-center bg-black text-white px-3 py-2 rounded-3xl gap-2'
                        >
                            <FaPen />
                            <h1 className='text-nowrap md:text-base text-xl'>Edit Profile</h1>
                        </button>
                        {/* <div className='flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center'>
                            <HiOutlineDotsVertical className="font-bold text-3xl md:text-2xl" />
                        </div> */}
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                author={author}
                onClose={() => setIsEditModalOpen(false)}
                handleProfileUpdate={handleProfileUpdate}
            />
        </>
    );
};

export default ProfileCard;