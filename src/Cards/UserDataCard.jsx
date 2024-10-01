import React from 'react'

const UserDataCard = ({ image, username, text, time }) => {
  return (
<div className='flex w-full overflow-hidden items-center gap-2'>
  <img className='rounded-full w-12 h-12' src={image} alt="" />
  <div className='flex gap-x-2 flex-col'>
    <h2 className='text-sm text-wrap font-semibold whitespace-normal'>
      {username}
      <span className='ml-2 font-light text-gray-400 text-xs whitespace-normal'>{text}</span>
    </h2>
    <p className='text-xs text-gray-400'>{time}</p>
  </div>
</div>

  )
}

export default UserDataCard
