import React from 'react';
import { FaPen, FaPlus } from 'react-icons/fa';

const MyWorkCard = ({ videos }) => {
  return (
    <div className='alldata w-full bg-gray-100 m-1 rounded p-6'>
      {/* Videos Section */}
      <div className="videos">
        <div className='flex justify-between items-center mb-4'>
          <div className='flex-1'>
            <h1 className='text-xl'>Videos ({videos.length})</h1>
            <p className='text-sm text-gray-400'>1 Hour ago</p>
          </div>
          <div className='text-blue-500 cursor-pointer'>
            <div className='flex gap-2'>
              <div className='rounded-full p-3 bg-[#D6EBFF]'>
                <FaPen className='text-[#399AF3]' />
              </div>
              <div className='bg-[#B3FCE2] rounded-full p-3'>
                <FaPlus className='text-[#008F5C]' />
              </div>
            </div>
          </div>
        </div>

        <div className="carousel w-full flex gap-4 overflow-x-auto">
          {videos.map((video, index) => (
            <div key={index} className="carousel-item w-1/2 p-2 flex-shrink-0">
              <div className='flex flex-col items-start'>
                <img src={video.thumbnail} alt={video.title} className='w-full h-auto object-cover rounded mb-4' />
                <div >
                  <h2 className='text-lg font-bold mb-2'>{video.title}</h2>
                  <a href={video.videoLink} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
                    {video.videoLink}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWorkCard;
