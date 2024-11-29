import React, { useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';
import { IoMdArrowBack } from "react-icons/io";
import useFetchCastingCall from '../../Hooks/useFetchCastingCall';
import Loader from '../Loader/Loader';

const Applied = () => {
  const { isLoading, userData, appliedUserData } = useFetchCastingCall();
  console.log(appliedUserData)
  const userdata = [
    {
      title: "Short Film",
      img: land4cardimg,
      username: "Hamza Akbar",
      description: "We're looking for the talented actors for our upcoming short film.",
      location: "Islamabad",
      type: "Short Film",
      shoot: "25 Days",
      budget: "$25K",
      age: "12",
      height: "5 ft",
      gender: "Male",
      shootdays: "30",
      crew: "1",
      applied: true
    },
    {
      title: "Short Film",
      img: land4cardimg,
      username: "Sayam",
      description: "We're looking for the talented actors for our upcoming short film.",
      location: "Islamabad",
      type: "Short Film",
      shoot: "25 Days",
      budget: "$25K",
      age: "12",
      height: "5 ft",
      gender: "Male",
      shootdays: "30",
      crew: "1",
      applied: true
    }
  ];

  const applied = true;

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to handle sheet visibility

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='bg-gray-100 flex mt-1'>
        {/* Left Section (Card List) */}
        <div className='left overflow-y-auto h-screen flex flex-col gap-2 w-full md:w-1/3'>
          {
            appliedUserData.map((data, index) => (
              <div
                key={data.id || index}
                onClick={() => {
                  setSelectedCardIndex(index);
                  setIsSheetOpen(true); // Open the sheet when a card is clicked on small screens
                }}
              >
                <UserCard {...data} img={data.authorDetails.image} isSelected={selectedCardIndex === index} />
              </div>
            ))
          }
        </div>

        {/* Right Section (UserDescription for md/lg screens) */}
        <div className='right md:block hidden flex-grow'>
          <div className="pl-1">
            {
              selectedCardIndex !== null && selectedCardIndex < appliedUserData.length && (
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
                  title={appliedUserData[selectedCardIndex].title}
                  img={appliedUserData[selectedCardIndex].authorDetails.image}
                  des={appliedUserData[selectedCardIndex].description}
                  budget={appliedUserData[selectedCardIndex].budget}
                  age={appliedUserData[selectedCardIndex].age}
                  height={appliedUserData[selectedCardIndex].height}
                  gender={appliedUserData[selectedCardIndex].gender}
                  location={appliedUserData[selectedCardIndex].city}
                  day={appliedUserData[selectedCardIndex].duration}
                  crew={appliedUserData[selectedCardIndex].crew}
                  username={appliedUserData[selectedCardIndex].authorDetails.firstName}
                  time={appliedUserData[selectedCardIndex].createdAt}
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
              selectedCardIndex !== null && selectedCardIndex < appliedUserData.length &&  (
                <UserDescription
                  title={appliedUserData[selectedCardIndex].title}
                  img={appliedUserData[selectedCardIndex].authorDetails.image}
                  des={appliedUserData[selectedCardIndex].description}
                  budget={appliedUserData[selectedCardIndex].budget}
                  age={appliedUserData[selectedCardIndex].age}
                  height={appliedUserData[selectedCardIndex].height}
                  gender={appliedUserData[selectedCardIndex].gender}
                  location={appliedUserData[selectedCardIndex].city}
                  day={appliedUserData[selectedCardIndex].duration}
                  crew={appliedUserData[selectedCardIndex].crew}
                  username={appliedUserData[selectedCardIndex].authorDetails.firstName}
                  time={appliedUserData[selectedCardIndex].createdAt}
                  applied={applied}
                />
              )
            }
          </div>
        </div>
      </div>
    )
  );
}

export default Applied;
