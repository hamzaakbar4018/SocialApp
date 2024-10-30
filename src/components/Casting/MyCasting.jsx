import React, { useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';
import { IoMdArrowBack } from "react-icons/io";

const MyCasting = () => {
  const userdata = [
    {
      title: "The Short Film",
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
      casting: "true",
      date: "2 days ago",
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
      cast: "true",
      date: "1 hour ago",

    }

  ];

  const handleDataSend = (data) => {
    console.log(data);
  };

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const mycasting = true;

  const [createCast, setCreateCasting] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); 


  const handleCasting = () => {
    setCreateCasting(!createCast);
  }

  return (
    <div className='bg-gray-100 flex mt-1 '>
      <div className='left flex flex-col gap-1 md:w-1/3 w-full'>
        <div className='bg-white p-3'>
          <button onClick={handleCasting} className='bg-black px2 py-3 flex justify-center items-center gap-2 rounded-full text-white font-semibold w-full'><span className='text-3xl font-light'>+</span> Create Casting Call</button>
        </div>
        {

          userdata.map((data, index) => (
            <div key={index} onClick={() => {
              setSelectedCardIndex(index);
              setIsSheetOpen(true); // Open the sheet when a card is clicked on small screens
            }}>
              <UserCard {...data} mycasting={mycasting} isSelected={selectedCardIndex === index} />
            </div>
          ))
        }
      </div>
      <div className='right md:block hidden flex-grow'>
        <div className="pl-1">
          {
            selectedCardIndex !== null && (
              <UserDescription
                {...userdata[selectedCardIndex]}
                mycasting={mycasting}
                sendData={handleDataSend}
              />
            )
          }
        </div>
      </div>
      <div className={`fixed z-40 top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full sm:w-2/3`}>
        <button
          className="absolute top-3 left-[-1] bg-white w-full p-4 text-black"
          onClick={() => setIsSheetOpen(false)}
        >
          <IoMdArrowBack className='text-2xl mb-1 mt-3' />
        </button>

        <div className="py-4">
          {
            selectedCardIndex !== null && (
              <UserDescription
                {...userdata[selectedCardIndex]}
                mycasting={mycasting}
                sendData={handleDataSend}
              />
            )
          }
        </div>
      </div>
      {createCast && (
        <div className="modal" open>
          <div className="modal-box flex p-0 flex-col 2xl:h-[60%] h-[80%] md:h-auto md:w-[40%]">
            <div className='px-5 pt-6'>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCasting}>✕</button>
              <h3 className="font-bold text-lg mb-4">Create Casting Call</h3>
            </div>
            <div className="flex-grow overflow-auto">

              <div className='pt-5 px-5'>
                <div className='flex flex-col gap-2 mt-4'>
                  <label htmlFor="">Project Title</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Project Title' />
                </div>
                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Short Description</label>

                  <textarea name="" className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl' placeholder='' id="">Enter Short Description</textarea>
                </div>
                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Crew Required</label>
                  <select className='bg-gray-100 p-2 rounded-3xl' name="" id="">
                    <option value="">Crew 1</option>
                    <option value="">Crew 2</option>
                    <option value="">Crew 3</option>
                  </select>
                </div>
                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">City Name</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter City Name' />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Contact Email</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact Email' />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Contact Number</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Contact Number' />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Role Title</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Role Title' />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Role Description</label>

                  <textarea name="" className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl' placeholder='' id="">Enter Role Description</textarea>
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Age Required</label>
                  <input type="number" className='bg-gray-100 p-2 rounded-3xl' placeholder='23' />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Gender</label>
                  <select className='bg-gray-100 p-2 rounded-3xl' name="" id="">
                    <option value="">Male</option>
                    <option value="">Female</option>
                  </select>
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Shoot Details</label>

                  <textarea name="" className='bg-gray-100 p-2 py-3 min-h-40 max-h-auto rounded-3xl' placeholder='' id="">Enter Shoot Details</textarea>
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                  <label htmlFor="">Budget/Remuneration</label>
                  <input type="text" className='bg-gray-100 p-2 rounded-3xl' placeholder='Enter Your Budget' />
                </div>


                <div className='mb-20'></div>
              </div>
              <div className='flex bg-white fixed bottom-0 w-full py-3 px-5 pt-4 items-end justify-center md:justify-end gap-3 mt-4'>
                <div className='bg-[#FFE5E5] text-[#FF0000] md:w-auto w-full md:block flex justify-center   px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                  <button onClick={handleCasting}>
                    Cancel
                  </button>
                </div>
                <div className='bg-black  md:w-auto w-full md:block flex justify-center text-white px-4 py-3 rounded-full md:rounded-3xl md:text-base text-xl'>
                  <button>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCasting;
