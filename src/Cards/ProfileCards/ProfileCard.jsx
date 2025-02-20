import React, { useState } from 'react';
import { FaUsers, FaPen } from "react-icons/fa6";
import { BsPostcardHeart } from "react-icons/bs";
import useAuthor from '../../Hooks/useAuthor';
import EditProfileModal from './EditProfileModal';

const ProfileCard = () => {
    const { authorInfo, fetchAuthorAndPosts } = useAuthor();
    const { author, posts, loading, error } = authorInfo;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleProfileUpdate = async () => {
        await fetchAuthorAndPosts();
    };

    const openImageModal = () => {
        document.getElementById('image_modal').showModal();
    };

    if (error) return <div>Error loading profile</div>;

    if (loading) {
        return (
            <div className='p-6 md:flex md:flex-row flex flex-col justify-center md:justify-between md:items-start items-center gap-3'>
                <div className='rounded-full min-w-36 min-h-36 animate-pulse bg-gray-200' />

                <div className='w-full flex flex-col items-center md:items-start gap-3'>
                    <div className='h-7 w-48 animate-pulse bg-gray-200 rounded' />
                    <div className='h-16 w-[70%] animate-pulse bg-gray-200 rounded' />

                    <div className='mt-5 flex gap-4'>
                        <div className='px-3 py-2 rounded-full border flex items-center gap-2'>
                            <div className='rounded-full w-14 h-14 animate-pulse bg-gray-200' />
                            <div className='w-20'>
                                <div className='h-5 w-full animate-pulse bg-gray-200 rounded mb-1' />
                                <div className='h-5 w-8 animate-pulse bg-gray-200 rounded' />
                            </div>
                        </div>

                        <div className='px-3 py-2 rounded-full border flex items-center gap-2'>
                            <div className='rounded-full w-14 h-14 animate-pulse bg-gray-200' />
                            <div className='w-20'>
                                <div className='h-5 w-full animate-pulse bg-gray-200 rounded mb-1' />
                                <div className='h-5 w-8 animate-pulse bg-gray-200 rounded' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-[30%]'>
                    <div className='flex gap-3 justify-center md:justify-end items-center'>
                        <div className='h-10 w-full animate-pulse bg-gray-200 rounded-3xl' />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='p-6 md:flex md:flex-row flex flex-col justify-center md:justify-between md:items-start items-center gap-3'>
                <img
                    onClick={openImageModal}
                    src={author?.image || 'https://example.com/path/to/defaultanonymousimage.png'}
                    alt="Profile"
                    className='rounded-full max-w-36 min-w-36 max-h-36 border cursor-pointer transition-all hover:shadow-lg'
                />

                <div className='w-full flex flex-col items-center md:items-start'>
                    <h1 className='font-bold text-xl'>{author?.firstName}</h1>
                    <p className='text-gray-400 max-w-[70%]'>{author?.bio}</p>
                    <div className='mt-5 flex gap-4'>
                        <div className='px-3 py-2 rounded-full border flex items-center gap-2'>
                            <div className='rounded-full text-2xl p-4 text-[#008F5C] bg-[#B3FCE2]'>
                                <FaUsers />
                            </div>
                            <div>
                                <h2 className='text-gray-400'>Connects</h2>
                                <p>{author?.friends?.length || 0}</p>
                            </div>
                        </div>

                        <div className='flex px-3 py-2 rounded-full border items-center gap-2'>
                            <div className='rounded-full text-2xl p-4 text-[#399AF3] bg-[#D6EBFF]'>
                                <BsPostcardHeart />
                            </div>
                            <div>
                                <h2 className='text-gray-400'>Posts</h2>
                                <p>{posts?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-[30%]'>
                    <div className='flex gap-3 justify-center md:justify-end items-center'>
                        <button
                            onClick={() => document.getElementById('edit_modal').showModal()}
                            className='flex justify-center w-full items-center bg-black text-white px-3 py-2 rounded-3xl gap-2'
                        >
                            <FaPen />
                            <h1 className='text-nowrap md:text-base text-xl'>Edit Profile</h1>
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Image Modal */}
            <dialog id="image_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Profile photo</h3>
                    <div className="flex flex-col items-center">
                        <div className="rounded-full overflow-hidden w-64 h-64 mx-auto mb-4">
                            <img 
                                src={author?.image || 'https://example.com/path/to/defaultanonymousimage.png'} 
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* <div className="flex justify-center gap-4 mt-4">
                            <button className="btn btn-sm">Edit</button>
                            <button className="btn btn-sm">Frames</button>
                            <button className="btn btn-sm">Delete</button>
                        </div> */}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

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