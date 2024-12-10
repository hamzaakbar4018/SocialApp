import React, { useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import { IoMdArrowBack } from "react-icons/io";
import Loader from '../Loader/Loader'
import useFetchCastingCall from '../../Hooks/useFetchCastingCall';

const Calls = () => {

  const { isLoading, allCallsNUsers } = useFetchCastingCall();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const callpage = false;
  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='flex mt-1'>
        <div className='left overflow-y-auto h-screen flex bg-white flex-col gap-2 w-full md:w-1/3'>
          {
            allCallsNUsers.map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedCardIndex(index);
                  setIsSheetOpen(true);
                }}
              >
                <UserCard {...data} img={data.user.image} isSelected={selectedCardIndex === index} />
              </div>
            ))
          }
        </div>

        <div className='right md:block hidden flex-grow'>
          <div className="pl-1">
            {
              selectedCardIndex !== null && selectedCardIndex < allCallsNUsers.length && (
                <UserDescription
                  callId={allCallsNUsers[selectedCardIndex].docID}
                  title={allCallsNUsers[selectedCardIndex].title}
                  img={allCallsNUsers[selectedCardIndex].user.image}
                  des={allCallsNUsers[selectedCardIndex].description}
                  budget={allCallsNUsers[selectedCardIndex].budget}
                  age={allCallsNUsers[selectedCardIndex].age}
                  height={allCallsNUsers[selectedCardIndex].height}
                  gender={allCallsNUsers[selectedCardIndex].gender}
                  location={allCallsNUsers[selectedCardIndex].city}
                  day={allCallsNUsers[selectedCardIndex].duration}
                  crew={allCallsNUsers[selectedCardIndex].crew}
                  username={allCallsNUsers[selectedCardIndex].user.firstName}
                  time={allCallsNUsers[selectedCardIndex].createdAt}
                />
              )
            }
          </div>
        </div>

        {/* Sliding sheet for small screens */}
        <div className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full sm:w-2/3`}>
          <button
            className="absolute top-0 left-0 bg-white w-full p-4 text-black"
            onClick={() => setIsSheetOpen(false)}
          >
            <IoMdArrowBack className='text-2xl mb-1 mt-3' />
          </button>

          <div className="">
            {
              selectedCardIndex !== null && selectedCardIndex < allCallsNUsers.length && (
                <UserDescription
                  title={allCallsNUsers[selectedCardIndex].title}
                  img={allCallsNUsers[selectedCardIndex].user.image}
                  des={allCallsNUsers[selectedCardIndex].description}
                  budget={allCallsNUsers[selectedCardIndex].budget}
                  age={allCallsNUsers[selectedCardIndex].age}
                  height={allCallsNUsers[selectedCardIndex].height}
                  gender={allCallsNUsers[selectedCardIndex].gender}
                  location={allCallsNUsers[selectedCardIndex].city}
                  day={allCallsNUsers[selectedCardIndex].duration}
                  crew={allCallsNUsers[selectedCardIndex].crew}
                  username={allCallsNUsers[selectedCardIndex].user.firstName}
                  time={allCallsNUsers[selectedCardIndex].createdAt}

                />
              )
            }
          </div>
        </div>
      </div>
    )
  );
}

export default Calls;
