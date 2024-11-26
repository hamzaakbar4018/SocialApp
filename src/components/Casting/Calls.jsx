import React, { useEffect, useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';
import { IoMdArrowBack } from "react-icons/io";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Loader from '../Loader/Loader'
import { query, where } from 'firebase/firestore';
import useFetchCastingCall from '../../Hooks/useFetchCastingCall';

const Calls = () => {

  const { isLoading, userData } = useFetchCastingCall();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const callpage = false;
  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='flex mt-1'>
        {/* Left Section (Card List) */}
        <div className='left overflow-y-auto h-screen flex bg-white flex-col gap-2 w-full md:w-1/3'>
          {
            userData.map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedCardIndex(index);
                  setIsSheetOpen(true); // Open the sheet when a card is clicked on small screens
                }}
              >
                <UserCard {...data} isSelected={selectedCardIndex === index} />
              </div>
            ))
          }
        </div>

        {/* Right Section (UserDescription for md/lg screens) */}
        <div className='right md:block hidden flex-grow'>
          <div className="pl-1">
            {
              selectedCardIndex !== null && selectedCardIndex < userData.length && (
                <UserDescription
                  title={userData[selectedCardIndex].title}
                  img={userData[selectedCardIndex].user.image}
                  des={userData[selectedCardIndex].description}
                  budget={userData[selectedCardIndex].budget}
                  age={userData[selectedCardIndex].age}
                  height={userData[selectedCardIndex].height}
                  gender={userData[selectedCardIndex].gender}
                  location={userData[selectedCardIndex].city}
                  day={userData[selectedCardIndex].duration}
                  crew={userData[selectedCardIndex].crew}
                  username={userData[selectedCardIndex].user.firstName}
                  time={userData[selectedCardIndex].createdAt}
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
              selectedCardIndex !== null && selectedCardIndex < userData.length && (
                <UserDescription
                  title={userData[selectedCardIndex].title}
                  img={userData[selectedCardIndex].user.image}
                  des={userData[selectedCardIndex].description}
                  budget={userData[selectedCardIndex].budget}
                  age={userData[selectedCardIndex].age}
                  height={userData[selectedCardIndex].height}
                  gender={userData[selectedCardIndex].gender}
                  location={userData[selectedCardIndex].city}
                  day={userData[selectedCardIndex].duration}
                  crew={userData[selectedCardIndex].crew}
                  username={userData[selectedCardIndex].user.firstName}
                  time={userData[selectedCardIndex].createdAt}

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
