import React from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import '../CSS/Connections.css'
const Conneections = ({ image, username, description }) => {
  return (
    <div className='flex flex-col gap-4 bg-white rounded p-2'>
      <div className='flex font-bold gap-2 items-center'>
        <img src={image} alt="" className='w-12 h-12 rounded-full' />
        <div className=''>
          <h1 className='text-sm font-semibold'>{username}</h1>
          <p className='text-gray-400 text-xs'>{description}</p>
        </div>
      </div>
      <div className='flex justify-start items-center gap-4 mt-3'>
        <button className='flex items-center gap-1 bg-[#B3FCE2] text-[#008F5C] py-1 px-3 rounded-3xl hover:bg-[#B3FCE2]'>
          <AiOutlineCheck size={16} />
          Accept
        </button>
        <button className='flex items-center gap-1 bg-[#FFE5E5] text-[#FF4E4E] py-1 px-3 rounded-3xl hover:bg-[#FFE5E5]'>
          <AiOutlineClose size={16} />
          Reject
        </button>
      </div>
    </div>
  )
}

export default Conneections
