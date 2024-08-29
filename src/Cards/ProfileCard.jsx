import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { BsPostcardHeart } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";
const ProfileCard = ({ username, userImg, description }) => {
    return (
        <div className='p-6 flex gap-3'>
            <img src={userImg} alt="" className='rounded-full border' />
            <div className='w-full'>
                <h1 className='font-bold text-xl'>{username}</h1>
                <p className='text-gray-400'>{description}</p>
                <div className='mt-5 flex gap-4'>
                    <div className='flex items-center gap-2'>
                        <div className='rounded-full text-2xl p-4 text-[#008F5C] bg-[#B3FCE2]'>
                            <FaUsers />
                        </div>
                        <div className=''>
                            <h2 className='text-gray-400'>Connects</h2>
                            <p>124.k</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
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
                <div className=''>
                    <div className='flex gap-3 justify-center items-center '>
                        <button className='flex justify-center items-center bg-black text-white px-3 py-2 rounded-3xl gap-2'>
                            <FaPen />
                            <h1 className='text-nowrap'>Edit Profile</h1>
                        </button>
                        <BsThreeDotsVertical className='text-2xl cursor-pointer'/>
                    </div>
                </div>
        </div>
    )
}

export default ProfileCard