import React, { useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsPatchCheck } from "react-icons/bs";
import UserCard from './UserCard';
import { FaRegTrashAlt } from "react-icons/fa";
import land4cardimg from '../../assets/Images/land4cardimg.png';
import Arrow from '../../assets/Icons SVG/Arrow2.svg'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ReceivedBlue from '../../assets/Icons SVG/ReceivedBlue.svg'
import ReceivedGrey from '../../assets/Icons SVG/ReceivedGrey.svg'
import RejectedBlue from '../../assets/Icons SVG/RejectedBlue.svg'
import RejectedGrey from '../../assets/Icons SVG/RejectedGrey.svg'
import WishlistBlue from '../../assets/Icons SVG/WishlistBlue.svg'
import WishlistGrey from '../../assets/Icons SVG/WishlistGrey.svg'


const UserDescription = ({ applied, cast, img, username, age, day, crew, height, gender, des, title, budget, location, mycasting, date, shoot, type }) => {

  const activeStyle = {
    color: '#399AF3',
    filter: 'none',
  };

  const defaultStyle = {
    color: 'gray',
    filter: 'brightness(100%)',
  };

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
  const [applicants, setApplicants] = useState(false);
  const seeApplicants = () => {
    setApplicants(!applicants)
  }
  const navigate = useNavigate(); // Use navigate instead of Navigate component
  const locationn = useLocation();

  useEffect(() => {
    if (locationn.pathname === '/casting/mycalls') {
      // Programmatically navigate to "/casting/mycalls/received"
      navigate('/casting/mycalls/received');
    }
  }, [locationn.pathname, navigate]);
  const castingtab = true;
  return (
    <>
      <div className='bg-white rounded p-4'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='text-gray-400'>Published <span className='text-[#399AF3]'></span>{date}</p>
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
              <>
                <div className='flex gap-2'>
                  <button onClick={handlecasting} className='bg-[#FFE5E5] text-[#FF0000] flex gap-1 justify-center items-center rounded-3xl px-3 py-2'>
                    <FaRegTrashAlt />
                    Delete</button>
                </div>
              </>
            ) : (
              <button className='bg-black text-white rounded-3xl px-3 py-2' onClick={handleApplyClick}>
                Apply Now
              </button>
            )}
            <div className='flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center'>
              <HiOutlineDotsVertical className="font-bold text-2xl" />
            </div>
          </div>
        </div>
      </div>
      {
        mycasting && (
          <div className='bg-[#E7F3FE] mt-1 p-4'>
            <div className='flex justify-between items-center '>
              <div>
                <h1 className='text-lg'>Applicants</h1>
                <h2 className='text-[#399AF3] text-xl font-bold'>520</h2>
              </div>
              <div onClick={seeApplicants} className='flex cursor-pointer items-center gap-1'>
                <h1 className='text-xl text-[#399AF3] font-semibold'>View Applications </h1>
                <img className="" src={Arrow} alt="" />
              </div>
            </div>
          </div>
        )
      }
      {
        applicants && (
          <div className="fixed z-40 rounded-l-xl p-0 top-0 right-0 bg-white w-[400px] 2xl:w-[500px] h-screen transition-all duration-1000 overflow-y-auto ease-in-out">
            <div className='w-full  border-b border-gray-300'>
              <div className='p-3 mb-4 mt-3 flex justify-between'>
                <div>
                  <h1 className='text-lg'>Applications</h1>
                  <p className='text-lg font-semibold text-[#399AF3]'>520 Applicants</p>
                </div>
                <div>
                  <button onClick={seeApplicants} className="btn btn-sm border border-gray-300 btn-circle btn-ghost">✕</button>
                </div>
              </div>
            </div>


            <div>
              {
                <UserCard img={img} username={username} age={age} day={day} crew={crew} height={height} gender={gender} des={des} title={title} budget={budget} location={location} mycasting={mycasting} date={date} castingtab={castingtab} type={type} shoot={shoot}
                />
              }

              <div className='border-gray-300 border-b border-t'>
                <ul className='flex py-4 px-3 border-gray-300 border-b justify-between items-center'>
                  <li>
                    <NavLink
                      to="/casting/mycalls/received"
                      className='flex gap-1 font-semibold'
                      style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                    >
                      {({ isActive }) => (
                        <>
                          <img
                            src={isActive ? ReceivedBlue : ReceivedGrey}
                            alt="Received Icon"
                          />
                          <h1>Received</h1>
                        </>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/casting/mycalls/rejected"
                      className='flex gap-1 font-semibold'
                      style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                    >
                      {({ isActive }) => (
                        <>
                          <img
                            src={isActive ? RejectedBlue : RejectedGrey}
                            alt="Received Icon"
                          />
                          <h1>Rejected</h1>
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/casting/mycalls/wishlist"
                      className='flex gap-1 font-semibold'
                      style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                    >
                      {({ isActive }) => (
                        <>
                          <img
                            src={isActive ? WishlistBlue : WishlistGrey}
                            alt="Received Icon"
                          />
                          <h1>Received</h1>
                        </>
                      )}
                    </NavLink>
                  </li>
                </ul>
                <Outlet />
              </div>





              <div className='bg-white fixed w-full bottom-0 p-3'>
                <button onClick={handlecasting} className='bg-[#FFE5E5] w-[380px] 2xl:w-[480px]  text-[#FF0000] flex gap-2   justify-center items-center rounded-3xl px-3 py-2'>
                  <FaRegTrashAlt />
                  Delete This Call</button>
              </div>
            </div>

          </div>
        )
      }


      {/* User Details */}
      <div className='bg-white  rounded mt-1 '>
        <div className='flex p-4 bg-[#E6E7E854] gap-2'>
          <img src={img} className='w-12 h-12 rounded-full' alt={`${username}'s profile`} />
          <div>
            <h2 className='text-gray-400'>Posted by</h2>
            <h1 className='text-xl font-bold'>{username}</h1>
          </div>
        </div>
        <div className='mt-2 p-4 border-b border-gray-200 pb-2'>
          <h2 className='text-gray-400'>Description</h2>
          <p>{des}</p>
        </div>
        <div className='mt-2 p-4 border-b border-gray-200 pb-2'>
          <h2 className='text-gray-400'>Location</h2>
          <p>{location}</p>
        </div>

        {/* Shoot Details */}
        <div className='mt-2 p-4'>
          <h1 className='text-[#399AF3] mb-2'>Shoot Details</h1>
          <div className='flex justify-between border-b border-gray-200 pb-2'>
            <div>
              <h2 className='text-gray-400'>Crew</h2>
              <p>{crew}</p>
            </div>
            <div className='px-4'>
              <h2 className='text-gray-400'>Duration</h2>
              <p>{day} Days shoot</p>
            </div>
            <div className='px-4'>
              <h2 className='text-gray-400'>Budget</h2>
              <p>{budget}</p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className='mt-2 p-4'>
          <h1 className='text-[#399AF3] mb-2'>Requirements</h1>
          <div className='flex justify-between border-b border-gray-200 pb-2'>
            <div>
              <h2 className='text-gray-400'>Age</h2>
              <p>{age}</p>
            </div>
            <div className='px-4'>
              <h2 className='text-gray-400'>Height</h2>
              <p>{height}</p>
            </div>
            <div className='px-4'>
              <h2 className='text-gray-400'>Gender</h2>
              <p>{gender}</p>
            </div>
          </div>
        </div>
      </div>

      {casting && (
        <div className="modal" open>
          <div className="modal-box flex flex-col w-[35%]">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setcasting(false)}>✕</button>
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
              <div className='bg-[#E7F3FE] text-[#399AF3] px-4 py-2 rounded-3xl'>
                <button>
                  Keep
                </button>
              </div>
              <div className='bg-[#FFE5E5] text-[#FF0000] px-4 py-2 rounded-3xl'>
                <button onClick={handlecasting}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {apply && (
        <div className="modal" open>
          <div className="modal-box flex p-0 flex-col 2xl:h-[60%] w-[40%]">
            <div className='px-5 pt-6'>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleApplyClick}>✕</button>
              <h3 className="font-bold text-lg mb-4">Apply to Call</h3>
            </div>
            <div className="flex-grow overflow-auto">
              <UserCard
                title={userdata.title}
                img={userdata.img}
                type={userdata.type}
                budget={userdata.budget}
                username={userdata.username}
                apply={apply}

              />
              <div className='pt-5 px-5'>
                <div className='flex flex-col gap-2 mt-4'>
                  <label htmlFor="">Contact Number</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact' />
                </div>
                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Contact Email</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Email' />
                </div>
                <div className='flex flex-col mb-32 2xl:mb-0 gap-2 mt-3'>
                  <label htmlFor="">Note to Makers</label>

                  <textarea name="" className='bg-gray-100 p-2 py-3 min-h-60 rounded-3xl' placeholder='' id="">Write your note</textarea>
                </div>
              </div>
              <div className='flex bg-white fixed bottom-0 w-full py-3 px-5 pt-4 items-end justify-end gap-3 mt-4'>
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
        </div>
      )}
    </>
  );
};

export default UserDescription;
