import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsPatchCheck } from "react-icons/bs";
import UserCard from './UserCard';
import { FaRegTrashAlt } from "react-icons/fa";
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';
import Arrow from '../../assets/Icons SVG/Arrow2.svg'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ReceivedBlue from '../../assets/Icons SVG/ReceivedBlue.svg'
import ReceivedGrey from '../../assets/Icons SVG/ReceivedGrey.svg'
import RejectedBlue from '../../assets/Icons SVG/RejectedBlue.svg'
import RejectedGrey from '../../assets/Icons SVG/RejectedGrey.svg'
import WishlistBlue from '../../assets/Icons SVG/WishlistBlue.svg'
import WishlistGrey from '../../assets/Icons SVG/WishlistGrey.svg'
import { IoMdArrowBack } from "react-icons/io";
import { addDoc, collection, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import { ApplicationData } from '../../Context/ApplicationContext';
import { GiCrossMark } from "react-icons/gi";
import { ImSpinner2 } from 'react-icons/im';



const UserDescription = ({ myCallId, appliedUsers, onDelete, applied, img, username, age, day, crew, height, gender, des, title, budget, location, mycasting, shoot, type, time, isDeleting }) => {
  const { applicationCollection, myCallID, setApplicationCollection, setMyCallID } = useContext(ApplicationData);

  const dummyID = "YTHetwednqeLYoraizuJ4PLFFlp2";
  myCallId = "1W6yAcb7JG5guAuAJ7Dw"
  console.log("ID", dummyID)
  console.log("Call ID", myCallId)
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    // if (!currentUser) {
    //   setSubmitError('You must be logged in to apply');
    //   return;
    // }

    // Basic validation
    if (!contactNumber || !email) {
      setSubmitError('Please provide contact number and email');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Reference to the applications subcollection
      const applicationsCollectionRef = collection(
        db, 
        'castingCallCollection', 
        myCallId, 
        'applicationCollection'
      );

      const applicationDoc = await addDoc(applicationsCollectionRef, {
        docID: null, // This will be set by Firestore
        contactNumber,
        email,
        note,
        isAccepted: false,
        isRejected: false,
        isPending: true,
        createdAt: Timestamp.now(),
        castingCallID: myCallId,
        userID: dummyID,
      });

      // Reset form and show success
      setContactNumber('');
      setEmail('');
      setNote('');
      setSubmitSuccess(true);
      setApply(false); // Close the modal
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  useEffect(() => {
    if (myCallId && myCallId !== myCallID) {
      setMyCallID(myCallId);
    }
  }, [myCallId, myCallID, setMyCallID]);
  const fetchApplicationCollection = async (id) => {
    try {
      const fetchQuery = query(
        collection(db, "castingCallCollection", id, "applicationCollection"),
      );
      const querySnapShot = await getDocs(fetchQuery);
      const applications = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplicationCollection(applications);
      // console.log(applications)
    } catch (error) {
      console.error("Error fetching application collection:", error);
    }
  };

  const formatedTime = time?.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [appliedUser, setAppliedUser] = useState([]);
  const fetchAppliedUsers = async (id) => {
    try {
      const fetchQuery = query(
        collection(db, "userCollection"),
        where("docID", "==", id),
      );
      const querySnapShot = await getDocs(fetchQuery);
      const users = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppliedUser(users);
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };
  useEffect(() => {
    if (appliedUsers && appliedUsers.length > 0) {
      appliedUsers.forEach((userId) => {
        // console.log(userId)
        fetchAppliedUsers(userId);
      });
    }
    if (myCallID) {
      fetchApplicationCollection(myCallID);
    }
  }, [myCallID, appliedUsers]);
  const dayDate = time?.toDate().toLocaleDateString('en-US', {
    weekday: 'long', // This will show the full name of the day (e.g., "Monday")
  });
  const locationn = useLocation();
  const callpage = locationn.pathname === '/casting/calls'
  const appliedpage = locationn.pathname === '/casting/applied'
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
  const navigate = useNavigate();

  useEffect(() => {
    if (locationn.pathname === '/casting/mycalls') {
      navigate('/casting/mycalls/received');
    }
  }, [locationn.pathname, navigate]);
  const castingtab = true;
  const deletepop = true;
  return (
    <>
      <div className='h-screen overflow-y-auto'>
        <div className='bg-white mt-1 rounded p-4'>
          <div className='flex bg-white justify-end mb-12 md:hidden'>
            {
              applied && (
                <button className='bg-[#B3FCE2] text-sm md:text-base fixed text-[#008F5C] flex justify-center items-center gap-1 font-bold rounded-3xl px-3 py-2'>
                  <BsPatchCheck className='text-xl' />
                  Applied
                  <p>, 2 Days Ago</p>
                </button>
              )
            }
          </div>
          <div className='flex justify-between'>
            <div className=''>
              <h1 className='text-xl font-bold'>{title}</h1>
              <p className='text-gray-400'>Published <span className='text-[#399AF3]'>{formatedTime}</span></p>
            </div>
            <div className='flex justify-center items-center gap-3'>
              {applied ? (
                <div className='md:flex hidden gap-2'>
                  <button className='bg-[#B3FCE2] hidden text-[#008F5C] md:flex justify-center items-center gap-1 font-bold rounded-3xl px-3 py-2'>
                    <BsPatchCheck className='text-xl' />
                    Applied on
                    <p>, {dayDate}</p>
                  </button>
                  <button className='bg-black bottom-0 text-white rounded-3xl px-3 py-2'>Withdraw</button>
                </div>
              ) : mycasting ? (
                <div className='flex gap-2'>
                  <button
                    onClick={() => {
                      handlecasting(); // Toggle the casting creation UI
                    }}
                    className='bg-[#FFE5E5] text-[#FF0000] flex gap-1 justify-center items-center rounded-3xl px-3 py-2'>
                    {isDeleting ? (
                      <>
                        <ImSpinner2 className='text-2xl animate-spin mr-1 flex' /> Deleting
                      </>
                    ) : (
                      <><FaRegTrashAlt />
                        Delete</>
                    )}



                  </button>
                </div>
              ) : (
                <button className='bg-black md:block hidden text-white rounded-3xl px-3 py-2' onClick={(e)=>{
                  handleApplyClick();
                  handleApplicationSubmit(e);
                }}>
                  Apply Now
                </button>
              )}
              <div className='md:flex hidden border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center'>
                <HiOutlineDotsVertical className="font-bold text-2xl" />
              </div>



            </div>
          </div>
          {
            callpage ? (
              <div className='flex md:hidden absolute w-full bottom-0 p-4 text-xl left-0  z-40 bg-white gap-2 items-center px-10 justify-between '>
                <div className='flex w-full'>
                  <button className='bg-black w-auto flex-grow text-white rounded-3xl px-3 py-3' onClick={handleApplyClick}>
                    Apply Now
                  </button>
                </div>

                <div className='flex border border-gray-400 rounded-full w-[50px] h-[46px] p-2 justify-center items-center'>
                  <HiOutlineDotsVertical className="font-bold text-2xl" />
                </div>
              </div>
            ) :
              appliedpage ? (
                <div className='flex md:hidden absolute w-full bottom-0 p-4 text-xl left-0  z-40 bg-white gap-2 items-center px-10 justify-between'>
                  <div className='flex w-full gap-2'>
                    <button className='bg-black w-auto flex-grow sm:fixed bottom-0 text-white rounded-3xl px-3 py-3'>Withdraw</button>
                  </div>
                  <div className='flex border border-gray-400 rounded-full w-[50px] h-[46px] p-2 justify-center items-center'>
                    <HiOutlineDotsVertical className="font-bold text-2xl" />
                  </div>
                </div>
              ) : ('')
          }
        </div>
        {
          mycasting && (
            <div className='bg-[#E7F3FE] mt-1 p-4'>
              <div className='flex justify-between items-center '>
                <div>
                  <h1 className='text-lg'>Applicants</h1>
                  <h2 className='text-[#399AF3] text-xl font-bold'>{appliedUsers && appliedUsers.length}</h2>
                </div>
                <div onClick={seeApplicants} className='flex cursor-pointer items-center gap-1'>
                  <h1 className='text-xl text-[#399AF3] font-semibold'>View Applications </h1>
                  <img className="" src={Arrow} alt="" />
                </div>
              </div>
            </div>
          )
        }

        {/* User Details */}
        <div className='bg-white overflow-y-auto rounded mt-1'>
          <div className='flex p-4 bg-[#E6E7E854] gap-2'>
            <div className='flex-shrink-0'>
              <img src={img} className='w-12 h-12 rounded-full object-cover' alt={`${username}'s profile`} />
            </div>
            <div>
              <h2 className='text-gray-400'>Posted by</h2>
              <h1 className='text-xl font-bold'>{username}</h1>
            </div>
          </div>
          <div className='mt-2 p-4 border-b border-gray-200 pb-2'>
            <h2 className='text-gray-400'>Description</h2>
            <p>{des ? des : "N/A"}</p>
          </div>
          <div className='mt-2 p-4 border-b border-gray-200 pb-2'>
            <h2 className='text-gray-400'>Location</h2>
            <p>{location ? location : "N/A"}</p>
          </div>

          {/* Shoot Details */}
          <div className='mt-2 p-4 overflow-y-auto'>
            <h1 className='text-[#399AF3] mb-2'>Shoot Details</h1>
            <div className='md:flex md:flex-row md:gap-0 flex flex-col gap-4 justify-between border-b border-gray-200 pb-2'>
              <div>
                <h2 className='text-gray-400'>Crew</h2>
                <p>{crew ? crew : "N/A"}</p>
              </div>
              <div className='md:px-4'>
                <h2 className='text-gray-400'>Duration</h2>
                <p>{day ? day : "N/A"} Days</p>
              </div>
              <div className='md:px-4'>
                <h2 className='text-gray-400'>Budget</h2>
                <p>{budget ? budget : "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className='mt-2 p-4 mb-20 md:mb-0 overflow-y-auto'>
            <h1 className='text-[#399AF3] mb-2'>Requirements</h1>
            <div className='md:flex md:flex-row md:gap-0 flex flex-col gap-4 justify-between border-b border-gray-200 pb-2'>
              <div>
                <h2 className='text-gray-400'>Age</h2>
                <p>{age ? age : "N/A"}</p>
              </div>
              <div className='md:px-4'>
                <h2 className='text-gray-400'>Height</h2>
                <p>{height ? height : "N/A"}</p>
              </div>
              <div className='md:px-4'>
                <h2 className='text-gray-400'>Gender</h2>
                <p>{gender ? gender : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        applicants && (
          <div className='bg-black bg-opacity-50 inset-0 fixed z-40 ease-in-out duration-500 transition-opacity transform-gpu'>
            <div className="fixed tr z-40 md:rounded-l-xl p-0 top-0 right-0 bg-white w-full md:w-[400px] 2xl:w-[500px] h-screen transition-all duration-1000 overflow-y-auto ease-in-out">
              <div className='w-full  border-b border-gray-300'>
                <div className='px-4 md:p-3 md:mt-0 mt-20 mb-4  flex justify-between'>
                  <div>
                    <h1 className='text-lg'>Applications</h1>
                    <p className='text-lg font-semibold text-[#399AF3]'>{appliedUsers && appliedUsers.length} Applicants</p>
                  </div>
                  <div>
                    <button onClick={seeApplicants} className="btn md:block hidden btn-sm border border-gray-300 btn-circle btn-ghost">✕</button>
                  </div>

                </div>
                <div className=' bg-white w-full'>
                  {
                    applicants && (
                      <button onClick={seeApplicants} className="md:hidden absolute top-3 left-0 bg-white w-full p-4 text-black block">
                        <IoMdArrowBack className='text-2xl mb-1 mt-2' />
                      </button>
                    )
                  }
                </div>
              </div>


              <div>
                {
                  <UserCard img={img} age={age} day={day} height={height} gender={gender} des={des} location={location} mycasting={mycasting} date={time} castingtab={castingtab} shoot={shoot}
                    username={username}
                    crew={crew}
                    title={title}
                    budget={budget}
                    type={type}
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
                            <h1>Pending</h1>
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
                            {/* <img
                              src={isActive ? WishlistBlue : WishlistGrey}
                              alt="Received Icon"
                            /> */}
                            <img
                              src={isActive ? RejectedBlue : RejectedGrey}
                              alt="Received Icon"
                            />
                            <h1>Accepted</h1>
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
                            {/* <img
                              src={isActive ? RejectedBlue : RejectedGrey}
                              alt="Received Icon"
                            /> */}
                            <GiCrossMark className={'{isActive ? RejectedBlue : RejectedGrey} mt-1'} />
                            <h1>Rejected</h1>
                          </>
                        )}
                      </NavLink>
                    </li>

                  </ul>
                  <Outlet />
                </div>





                <div className='bg-white fixed w-full bottom-0 p-3'>
                  <button onClick={handlecasting} className='bg-[#FFE5E5] md:w-[380px] w-full 2xl:w-[480px]  text-[#FF0000] flex gap-2   justify-center items-center rounded-3xl px-3 py-2'>
                    {isDeleting ? (
                      <>
                        <ImSpinner2 className='text-2xl animate-spin mr-1 flex' /> Deleting
                      </>
                    ) : (
                      <><FaRegTrashAlt />
                        Delete This Call</>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )
      }

      {casting && (
        <div className="modal" open>
          <div className="modal-box p-0 flex flex-col md:w-[35%]">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setcasting(false)}>✕</button>
            <h3 className="font-bold px-6 py-4 text-lg mb-4">Apply to Call</h3>
            <div className="flex-grow overflow-auto">
              <UserCard
                // title={userdata.title}
                // img={userdata.img}
                // type={userdata.type}
                // budget={userdata.budget}
                // username={userdata.username}
                // deletepop={deletepop}
                img={img}
                username={username}
                crew={crew}
                title={title}
                budget={budget}
                type={type}
                deletepop={deletepop}

              />
            </div>
            <p className='font-bold  p-6'>
              Delete a casting call is an irreversible action and will remove all associated information and submissions.</p>
            <div className='flex px-6 py-4 items-end justify-end gap-3 mt-4'>
              <div className='bg-[#E7F3FE] text-[#399AF3] px-4 py-2 rounded-3xl'>
                <button onClick={() => setcasting(false)}>
                  Keep
                </button>
              </div>
              <div className='bg-[#FFE5E5] text-[#FF0000] px-4 py-2 rounded-3xl'>
                <button onClick={() => {
                  onDelete();  // Call the delete function
                  setcasting(false);  // Close the modal
                }}>
                  {isDeleting ? (
                    <>
                      <ImSpinner2 className='text-2xl animate-spin mr-1 flex' /> Deleting
                    </>
                  ) : (
                    <div className='flex justify-center items-center gap-1'><FaRegTrashAlt />
                      Delete</div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {apply && (
        <div className="modal" open>
          <div className="modal-box flex p-0 flex-col md:h-[80%] h-[70%]  2xl:h-[80%] md:w-[40%]">
            <div className='px-5 pt-6'>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleApplyClick}>✕</button>
              <h3 className="font-bold text-lg mb-4">Apply to Call</h3>
            </div>
            <div className="flex-grow overflow-auto">
              <UserCard
                title={title}
                img={img}
                type={type}
                budget={budget}
                username={username}
                apply={apply}

              />
              <form onSubmit={handleApplicationSubmit} className='pt-5 px-5'>
                {/* Error handling */}
                {submitError && (
                  <div className="text-red-500 mb-4">
                    {submitError}
                  </div>
                )}
                
                {/* Form fields */}
                <div className='flex flex-col gap-2 mt-4'>
                  <label>Contact Number</label>
                  <input
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    type="text" 
                    className='bg-gray-100 p-2 rounded-3xl' 
                    placeholder='Enter Contact' 
                    required
                  />
                </div>
                <div className='flex flex-col gap-2 mt-3'>
                  <label>Contact Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    className='bg-gray-100 p-2 rounded-3xl' 
                    placeholder='Enter Email' 
                    required
                  />
                </div>
                <div className='flex flex-col  2xl:mb-0 gap-2 mt-3'>
                  <label>Note to Makers</label>
                  <textarea
                    value={note}
                    onChange={(e)=> setNote(e.target.value)}
                    className='bg-gray-100 p-2 py-3 min-h-60 rounded-3xl' 
                    placeholder='Write your note'
                  />
                </div>
                
                {/* Submit buttons */}
                <div className='flex overflow-hidden bg-white sticky bottom-0 w-full py-3  pt-4 items-end justify-center md:justify-end gap-3 mt-4'>
                  <div className='bg-[#FFE5E5] text-[#FF0000] md:w-auto w-full md:block flex justify-center px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                    <button type="button" onClick={handleApplyClick}>
                      Cancel
                    </button>
                  </div>
                  <div className='bg-black md:w-auto w-full md:block flex justify-center text-white px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Apply'}
                    </button>
                  </div>
                </div>
              </form>


              {/* <div className='pt-5 px-5'>
                <div className='flex flex-col gap-2 mt-4'>
                  <label htmlFor="">Contact Number</label>
                  <input
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact' />
                </div>
                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Contact Email</label>
                  <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Email' />
                </div>
                <div className='flex flex-col mb-32 2xl:mb-0 gap-2 mt-3'>
                  <label htmlFor="">Note to Makers</label>

                  <textarea
                  value={note}
                  onChange={(e)=> setNote(e.target.value)}
                  name="" className='bg-gray-100 p-2 py-3 min-h-60 rounded-3xl' placeholder='' id="">Write your note</textarea>
                </div>
              </div>
              <div className='flex bg-white fixed bottom-0 w-full py-3 px-5 pt-4 items-end justify-center md:justify-end gap-3 mt-4'>
                <div className='bg-[#FFE5E5] text-[#FF0000]  md:w-auto w-full md:block flex justify-center   px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                  <button onClick={handleApplyClick}>
                    Cancel
                  </button>
                </div>
                <div className='bg-black md:w-auto w-full md:block flex justify-center text-white px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Apply'}
                </button>
                </div>
              </div> */}


            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDescription;




