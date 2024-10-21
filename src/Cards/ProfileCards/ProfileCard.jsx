import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { BsPostcardHeart } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";
import { HiOutlineDotsVertical } from 'react-icons/hi';
const ProfileCard = ({ username, userImg, description }) => {
    return (
        <div className='p-6 md:flex md:flex-row flex flex-col justify-center md:justify-between md:items-start items-center gap-3'>
            <img src={userImg} alt="" className='rounded-full w-36 h-36 border' />
            <div className='w-full flex flex-col items-center md:items-start'>
                <h1 className='font-bold text-xl'>{username}</h1>
                <p className='text-gray-400'>{description}</p>
                <div className='mt-5 flex gap-4'>
                    <div className='px-3 py-2 rounded-full border  flex items-center gap-2'>
                        <div className='rounded-full text-2xl p-4 text-[#008F5C] bg-[#B3FCE2]'>
                            <FaUsers />
                        </div>
                        <div className=' '>
                            <h2 className='text-gray-400'>Connects</h2>
                            <p>124.k</p>
                        </div>
                    </div>

                    <div className='flex px-3 py-2 rounded-full border items-center gap-2'>
                        <div className='rounded-full text-2xl p-4 text-[#399AF3] bg-[#D6EBFF]'>
                            <BsPostcardHeart />
                        </div>
                        <div className=''>
                            <h2 className='text-gray-400'>Posts</h2>
                            <p>252</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-[30%]'>
                <div className='flex gap-3 justify-center md:justify-end md:items items-center '>
                    <button className='flex justify-center w-full items-center bg-black text-white px-3 py-2 rounded-3xl gap-2'>
                        <FaPen />
                        <h1 className='text-nowrap md:text-base text-xl'>Edit Profile</h1>
                    </button>
                    <div className='flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center'>
                        <HiOutlineDotsVertical className="font-bold text-3xl md:text-2xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard