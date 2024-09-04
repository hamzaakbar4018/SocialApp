import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsPatchCheck } from "react-icons/bs";
import UserCard from './UserCard';
import { FaRegTrashAlt } from "react-icons/fa";
import land4cardimg from '../../assets/Images/land4cardimg.png';


const UserDescription = ({ applied, cast, img, username, age, day, crew, height, gender, des, title, budget, location }) => {
  const [apply, setApply] = useState(false);
  const [casting, setcasting] = useState(false);

  const handleApplyClick = () => {
    setApply(!apply);
  };

  const handlecasting = () => {
    setcasting(!casting);
    console.log("delete clicked")
  }

  const userdata = {
    title: "Short Film",
    img: land4cardimg,
    username: "Hamza Akbar",
    type: "Short Film",
    budget: "$25K"
  };

  return (
    <>
      <div className='bg-white rounded p-4'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='text-gray-400'>Published on <span className='text-[#399AF3]'>24th April 2001</span></p>
          </div>
          <div className='flex justify-center items-center gap-3'>
            {applied ? (
              <div className='flex gap-2'>
                <button className='bg-[#B3FCE2] text-[#008F5C] flex justify-center items-center gap-1 font-bold rounded-3xl px-3 py-2'>
                  <BsPatchCheck className='text-xl' />
                  Applied
                  <p>, 2 Days Ago</p>
                </button>
                <button className='bg-black text-white rounded-3xl px-3 py-2'>Withdraw</button>
              </div>
            ) : cast ? (
              <div className='flex gap-2'>
                <button onClick={handlecasting} className='bg-[#FFE5E5] text-[#FF0000] flex gap-1 justify-center items-center rounded-3xl px-3 py-2'>
                <FaRegTrashAlt />
                  Delete</button>
              </div>
            ) : (
              <button className='bg-black text-white rounded-3xl px-3 py-2' onClick={handleApplyClick}>
                Apply Now
              </button>
            )}
            <div className='flex border border-gray-400 rounded-full w-[30px] h-[30px] p-2 justify-center items-center'>
              <HiOutlineDotsVertical className="font-bold text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className='bg-white rounded mt-1 p-4'>
        <div className='flex gap-2'>
          <img src={img} className='w-12 h-12 rounded-full' alt={`${username}'s profile`} />
          <div>
            <h2 className='text-gray-400'>Posted by</h2>
            <h1 className='text-xl font-bold'>{username}</h1>
          </div>
        </div>
        <div className='mt-2 border-b border-gray-200 pb-2'>
          <h2 className='text-gray-400'>Description</h2>
          <p>{des}</p>
        </div>
        <div className='mt-2 border-b border-gray-200 pb-2'>
          <h2 className='text-gray-400'>Location</h2>
          <p>{location}</p>
        </div>

        {/* Shoot Details */}
        <div className='mt-2'>
          <h1 className='text-[#399AF3] mb-2'>Shoot Details</h1>
          <div className='flex justify-between border-b border-gray-200 pb-2'>
            <div>
              <h2 className='text-gray-400'>Crew</h2>
              <p>{crew}</p>
            </div>
            <div>
              <h2 className='text-gray-400'>Duration</h2>
              <p>{day} Days shoot</p>
            </div>
            <div>
              <h2 className='text-gray-400'>Budget</h2>
              <p>{budget}</p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className='mt-2'>
          <h1 className='text-[#399AF3] mb-2'>Requirements</h1>
          <div className='flex justify-between border-b border-gray-200 pb-2'>
            <div>
              <h2 className='text-gray-400'>Age</h2>
              <p>{age}</p>
            </div>
            <div>
              <h2 className='text-gray-400'>Height</h2>
              <p>{height}</p>
            </div>
            <div>
              <h2 className='text-gray-400'>Gender</h2>
              <p>{gender}</p>
            </div>
          </div>
        </div>
      </div>

      {casting && (
        <div className="modal" open>
          <div className="modal-box flex flex-col w-[35%]">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleApplyClick}>✕</button>
            <h3 className="font-bold text-lg mb-4">Apply to Call</h3>
            <div className="flex-grow overflow-auto">
              <UserCard
                title={userdata.title}
                img={userdata.img}
                type={userdata.type}
                budget={userdata.budget}
                username={userdata.username}
              />
            </div>
            <p className='font-bold'>
              Delete a casting call is an irreversible action and will remove all associated information and submissions.</p>
            <div className='flex items-end justify-end gap-3 mt-4'>
              <div className='bg-[#FFE5E5] text-[#FF0000] px-4 py-2 rounded-3xl'>
                <button onClick={handlecasting}>
                  Cancel
                </button>
              </div>
              <div className='bg-black text-white px-4 py-2 rounded-3xl'>
                <button>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {apply && (
        <div className="modal" open>
          <div className="modal-box flex flex-col h-[60%] w-[35%]">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleApplyClick}>✕</button>
            <h3 className="font-bold text-lg mb-4">Apply to Call</h3>
            <div className="flex-grow overflow-auto">
              <UserCard
                title={userdata.title}
                img={userdata.img}
                type={userdata.type}
                budget={userdata.budget}
                username={userdata.username}
              />
              <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor="">Contact Number</label>
                <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact' />
              </div>
              <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="">Contact Email</label>
                <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Email' />
              </div>
              <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="">Note to Makers</label>
                <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Write your note' />
              </div>
            </div>
            <div className='flex items-end justify-end gap-3 mt-4'>
              <div className='bg-[#FFE5E5] text-[#FF0000] px-4 py-2 rounded-3xl'>
                <button onClick={handleApplyClick}>
                  Cancel
                </button>
              </div>
              <div className='bg-black text-white px-4 py-2 rounded-3xl'>
                <button>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDescription;
