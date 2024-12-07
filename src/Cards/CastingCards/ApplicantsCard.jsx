import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import WishlistBlue from '../../assets/Icons SVG/WishlistBlue.svg'
import '../../CSS/Landingpage.css'
const ApplicantsCard = ({ name, applied, age, height, gender, experience, image, rejected,WishlistCasting }) => {
    return (
        <div className='border-b border-gray-300'>
            <div className='p-4'>
                <div className='flex justify-between items-center '>
                    <div className='flex items-center gap-2'>
                        <img src={image} className='w-16 h-16 rounded-full' alt="" />
                        <div>
                            <h1 className='font-semibold text-lg'>{name}</h1>
                            <p className='text-[#676767] text-lg'>{applied}</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-2 text-2xl'>
                        <div className='text-[#399AF3] bg-[#399AF31F] rounded-full p-2' >
                            <img src={WishlistBlue} alt="" />
                        </div>
                        <div className='border border-gray-300 rounded-full p-2'>
                            <HiOutlineDotsVertical className='text-xl' />
                        </div>
                    </div>
                </div>
                <div className='ml-10 mt-2 items-center'>
                    <div className='flex gap-6 items-center'>
                        <div>
                            <h2 className='text-[#9B9B9B] segoe text-sm font-semibold'>Age</h2>
                            <h1 className='font-bold text-lg '>{age}</h1>
                        </div>
                        <div>
                            <h2 className='text-[#9B9B9B] segoe segoe text-sm font-semibold'>Height</h2>
                            <h1 className='font-bold text-lg '>{height}</h1>
                        </div>
                        <div>
                            <h2 className='text-[#9B9B9B] segoe text-sm font-semibold'>Gender</h2>
                            <h1 className='font-bold text-lg '>{gender}</h1>
                        </div>
                        <div>
                            <h2 className='text-[#9B9B9B] segoe text-sm font-semibold'>Experience</h2>
                            <h1 className='font-bold text-lg '>{experience   }</h1>
                        </div>
                    </div>

                </div>
                {
                    rejected ? (<div className='mt-5 ml-10'>
                        <h1 className='text-[#FF0000] text-lg'>Rejected {applied}</h1>
                    </div>) : (
                        <div className='flex mt-5 ml-10 items-center'>
                            <div className='flex gap-2 '>
                                <button className='px-3 flex items-center  rounded-3xl text-[#008F5C] bg-[#B3FCE2] py-2 '><TiTick className='text-2xl' /><span>Accept</span></button>
                                <button className='px-3 flex items-center  rounded-3xl text-[#FF0000] bg-[#FFE5E5] py-2 '><RxCross2 className='text-2xl' /><span>Reject</span></button>
                            </div>
                        </div >
                    )
                }


            </div >
        </div >
    )
}

export default ApplicantsCard