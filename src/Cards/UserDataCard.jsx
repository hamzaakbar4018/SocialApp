import React from 'react'

const UserDataCard = ({ fromImage, fromName, title, date }) => {
 
  const formattedDate = date?.toDate 
  ? date.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
  : date;

  return (
    <div className='flex w-full overflow-hidden items-center gap-2'>
      <img className='rounded-full w-14 h-10' src={fromImage} alt="" />
      <div className='flex gap-x-2 flex-col'>
        <h2 className='text-sm text-wrap font-semibold whitespace-normal'>
          {fromName}
          <span className='ml-2 font-light text-gray-400 text-xs whitespace-normal'>{title}</span>
        </h2>
        <p className='text-xs text-gray-400'>{formattedDate}</p>
      </div>
    </div>
  );
}

export default UserDataCard;
