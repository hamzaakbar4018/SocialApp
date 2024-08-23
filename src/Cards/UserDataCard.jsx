import React from 'react'

const UserDataCard = ({ image, username, text }) => {
  return (
    <div className='flex items-center  gap-2'>
      <img className='rounded-full w-12 h-12' src={image} alt="" />
      <div className='flex flex-col  gap-x-2 flex-wrap'>
        <h2 className='text-sm font-semibold'>{username}</h2>
        <p className='text-gray-400 text-xs'>{text}</p>
      </div>
    </div>
  )
}

export default UserDataCard
