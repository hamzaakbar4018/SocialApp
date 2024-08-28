import React from 'react'
import { IoMailOutline } from "react-icons/io5";
const TalentCards = ({ userpic, name, text }) => {
  return (
    <div>
      <div className='bg-white rounded-lg m w-[190px] h-[210px]'>
        <div className='p-6'>
          <div>
            <img src={userpic} className='rounded-full w-20 h-20' alt="User Image" />
            <h1 className='mt-2 text-xl'>{name}</h1>
            <p className='text-gray-400'>{text}</p>
          </div>
          <div className='flex justify-start gap-3 items-center'>
            <button className='bg-black rounded-3xl w-[100%] text-white px-3 py-2'>Connect</button>
            <IoMailOutline className='text-3xl'/>
          </div>
        </div>

      </div>

    </div>
  )
}

export default TalentCards