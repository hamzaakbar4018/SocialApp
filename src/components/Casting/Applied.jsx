import React, { useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';
import { IoMdArrowBack } from "react-icons/io";
import useFetchCastingCall from '../../Hooks/useFetchCastingCall';
import Loader from '../Loader/Loader';
import NoData from '../Loader/NoData';

const Applied = () => {

  const { isLoading, userAppliedCastingCalls , fetchCallsData } = useFetchCastingCall();
  const applied = true;

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to handle sheet visibility
  // console.log(userAppliedCastingCalls)
  return (
    isLoading ? (
      <Loader />
    ) : (
      userAppliedCastingCalls.length > 0 ?
        (
          <div className='bg-gray-100 flex mt-1'>
            {/* Left Section (Card List) */}
            <div className='left overflow-y-auto h-screen flex flex-col gap-2 w-full md:w-1/3'>
              {
                userAppliedCastingCalls.map((data, index) => (
                  <div
                    key={data.id || index}
                    onClick={() => {
                      setSelectedCardIndex(index);
                      setIsSheetOpen(true); // Open the sheet when a card is clicked on small screens
                    }}
                  >
                    <UserCard {...data} type={data.roleTitle} day={data.duration} location={data.city} img={data.user?.image || null} isSelected={selectedCardIndex === index} />
                  </div>
                ))
              }
            </div>

            {/* Right Section (UserDescription for md/lg screens) */}
            <div className='right md:block hidden flex-grow'>
              <div className="pl-1">
                {
                  selectedCardIndex !== null && selectedCardIndex < userAppliedCastingCalls.length && (
                    <UserDescription
                      // title={userdata[selectedCardIndex].title}
                      // img={userdata[selectedCardIndex].img}
                      // des={userdata[selectedCardIndex].description}
                      // budget={userdata[selectedCardIndex].budget}
                      // age={userdata[selectedCardIndex].age}
                      // height={userdata[selectedCardIndex].height}
                      // gender={userdata[selectedCardIndex].gender}
                      // location={userdata[selectedCardIndex].location}
                      // day={userdata[selectedCardIndex].shootdays}
                      // crew={userdata[selectedCardIndex].crew}
                      // username={userdata[selectedCardIndex].username}
                      // applied={userdata[selectedCardIndex].applied}
                      type={userAppliedCastingCalls[selectedCardIndex].roleTitle}
                      fetchCallsData={fetchCallsData}
                      callId={userAppliedCastingCalls[selectedCardIndex].id}
                      title={userAppliedCastingCalls[selectedCardIndex].title}
                      img={userAppliedCastingCalls[selectedCardIndex]?.user?.image || land4cardimg}
                      des={userAppliedCastingCalls[selectedCardIndex].description}
                      budget={userAppliedCastingCalls[selectedCardIndex].budget}
                      age={userAppliedCastingCalls[selectedCardIndex].age}
                      height={userAppliedCastingCalls[selectedCardIndex].height}
                      gender={userAppliedCastingCalls[selectedCardIndex].gender}
                      location={userAppliedCastingCalls[selectedCardIndex].city}
                      day={userAppliedCastingCalls[selectedCardIndex].duration}
                      crew={userAppliedCastingCalls[selectedCardIndex].crew}
                      username={userAppliedCastingCalls[selectedCardIndex]?.user?.firstName}
                      time={userAppliedCastingCalls[selectedCardIndex].createdAt}
                      applied={applied}
                    />
                  )
                }
              </div>
            </div>

            <div className={`fixed z-40 top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full sm:w-2/3`}>
              <button
                className="absolute top-3 left-0 bg-white w-full p-4 text-black"
                onClick={() => setIsSheetOpen(false)}
              >
                <IoMdArrowBack className='text-2xl mb-1 mt-3' />
              </button>

              <div className="py-4">
                {
                  selectedCardIndex !== null && selectedCardIndex < userAppliedCastingCalls.length && (
                    <UserDescription
                      type={userAppliedCastingCalls[selectedCardIndex].roleTitle}
                      callId={userAppliedCastingCalls[selectedCardIndex].id}
                      title={userAppliedCastingCalls[selectedCardIndex].title}
                      img={userAppliedCastingCalls[selectedCardIndex]?.user?.image}
                      des={userAppliedCastingCalls[selectedCardIndex].description}
                      budget={userAppliedCastingCalls[selectedCardIndex].budget}
                      age={userAppliedCastingCalls[selectedCardIndex].age}
                      height={userAppliedCastingCalls[selectedCardIndex].height}
                      gender={userAppliedCastingCalls[selectedCardIndex].gender}
                      location={userAppliedCastingCalls[selectedCardIndex].city}
                      day={userAppliedCastingCalls[selectedCardIndex].duration}
                      crew={userAppliedCastingCalls[selectedCardIndex].crew}
                      username={userAppliedCastingCalls[selectedCardIndex]?.user?.firstName}
                      time={userAppliedCastingCalls[selectedCardIndex].createdAt}
                      applied={applied}
                    />
                  )
                }
              </div>
            </div>
          </div>
        ) : (
          <NoData />
        )
    )

  );
}

export default Applied;
