import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from 'react-router-dom'

const UserCard = ({ title, img, type, shoot, budget, description, username, location, isSelected, landingpage,apply }) => {
    return (
        <div className={`p-4 ${apply && '!bg-gray-100'} ${landingpage && 'w-full min-h-full rounded'}  ${isSelected ? 'bg-[#ECF5FE] border-l-2 border-gray-700' : 'bg-white'}`}>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <div>
                        <img src={img} className='w-12 h-12' alt="" />
                    </div>
                    <div>
                        <h1 className={`text-xl 2xl:text-xl font-semibold`}>{title}</h1>
                        <p className='text-gray-400'>{username}</p>
                    </div>
                </div>
                {
                    landingpage || apply ? (
                        ''
                    ) : (
                        <div className=' flex border border-gray-400 rounded-full w-[33px] h-[33px] p-2  justify-center items-center'>
                            <HiOutlineDotsVertical className="font-bold text-2xl" />
                        </div>
                    )
                }
            </div>
            <div className='my-4 mx-2 2xl:mt-7 2xl:mb-7 2xl:text-xl' >
                {
                    landingpage && (
                        <p>{description}</p>
                    )
                }
            </div>
            <div className={`flex gap-16 2xl:text-xl bg-gradient-to-r from-[#F4F4F4] to-[#FFFFFF00] mt-3 ${landingpage && 'gap-20 bg border-l-2 flex justify-start border-black'}  items-center`}>
                <div className='md:ml-7 ml-4'>

                    <div>
                        <h2 className='text-gray-400'>Location</h2>
                        <h1 className='font-bold'>{location}</h1>
                    </div>
                    <div>
                        <h2 className='text-gray-400'>Type</h2>
                        <h1 className='font-bold'>{type}</h1>

                    </div>
                </div>
                <div className='md:ml-0 ml-4'>
                    <div>
                        <h2 className='text-gray-400'>Shoot</h2>
                        <h1 className='font-bold'>{shoot}</h1>

                    </div>
                    <div>
                        <h2 className='text-gray-400'>Budget</h2>
                        <h1 className='font-bold'>{budget}</h1>
                    </div>
                </div>
            </div>
            {
                landingpage && (
                    <Link to="/casting/calls">
                        <button className='p-3 rounded-3xl bg-black text-white mt-5'>
                            Apply Now
                        </button>
                    </Link>
                )
            }
        </div>
    )
}

export default UserCard