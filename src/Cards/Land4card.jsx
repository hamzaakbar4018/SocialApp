import React from 'react';

const Land4card = ({ title, img, username, description, location, type, shoot, budget }) => {
  return (
    <div className='rounded-lg w-[340px] md:w-[370px] bg-white p-4'>
      <h1>{title}</h1>
      <div className='mt-2 flex items-center gap-2'>
        <img src={img} alt="image" className='rounded-full w-10' />
        <h2 className='text-[#FC3F3F]'><span className='text-[#9B9B9B]'>by</span> {username}</h2>
      </div>
      <p className='mt-2 text-sm'>{description}</p>

      {/* style={{ background: 'linear-gradient(to right, #1C1C1C, #9B9B9B)' }} */}

      <div  className='border-l-2 border-black '>
      <table className='ml-2 mt-4'>
        <thead>
          <tr className=''>
            <td className='text-[#929292] pr-4'>Location</td>
            <td className='text-[#929292] pr-4'>Type</td>
            <td className='text-[#9B9B9B] pr-4'>Shoot</td>
            <td className='text-[#9B9B9B]'>Budget</td>
          </tr>
        </thead>
        <tbody>
          <tr className=''>
            <td className='pr-4'>{location}</td>
            <td className='pr-4'>{type}</td>
            <td className='pr-4'>{shoot}</td>
            <td>{budget}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Land4card;
