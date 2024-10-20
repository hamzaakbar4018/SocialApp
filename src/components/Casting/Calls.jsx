import React, { useState } from 'react'; 
import UserCard from '../../Cards/CastingCards/UserCard'; 
import UserDescription from '../../Cards/CastingCards/UserDescription'; 
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';  
import { IoMdArrowBack } from "react-icons/io";
const Calls = () => { 
  const userdata = [ 
    { 
      title: "Short Film", 
      img: land4cardimg, 
      username: "Hamza Akbar", 
      description: "We're looking for talented actors for our upcoming short film.", 
      location: "Islamabad", 
      type: "Short Film", 
      shoot: "25 Days", 
      budget: "$25K", 
      age: "12", 
      height: "5 ft", 
      gender: "Male", 
      shootdays: "30", 
      crew: "1",
      date : "1,Dec 2023" 
    }, 
    { 
      title: "Short Film", 
      img: land4cardimg, 
      username: "Sayam", 
      description: "We're looking for talented actors for our upcoming short film.We're looking for talented actors for our upcoming short film.We're looking for talented actors for our upcoming short film.We're looking for talented actors for our upcoming short film.", 
      location: "Islamabad", 
      type: "Short Film", 
      shoot: "25 Days", 
      budget: "$25K", 
      age: "12", 
      height: "5 ft", 
      gender: "Male", 
      shootdays: "30", 
      crew: "1" 
    } 
  ]; 

  const [selectedCardIndex, setSelectedCardIndex] = useState(0); 
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to handle sheet visibility

  return ( 
    <div className='flex mt-1'> 
      {/* Left Section (Card List) */}
      <div className='left flex bg-white flex-col gap-2 w-full md:w-1/3'> 
        { 
          userdata.map((data, index) => ( 
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
            selectedCardIndex !== null && ( 
              <UserDescription 
                title={userdata[selectedCardIndex].title} 
                img={userdata[selectedCardIndex].img} 
                des={userdata[selectedCardIndex].description} 
                budget={userdata[selectedCardIndex].budget} 
                age={userdata[selectedCardIndex].age} 
                height={userdata[selectedCardIndex].height} 
                gender={userdata[selectedCardIndex].gender} 
                location={userdata[selectedCardIndex].location} 
                day={userdata[selectedCardIndex].shootdays} 
                crew={userdata[selectedCardIndex].crew} 
                username={userdata[selectedCardIndex].username} 
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
          <IoMdArrowBack className='text-2xl mb-1 mt-3'/>
        </button>

        <div className="">
          { 
            selectedCardIndex !== null && ( 
              <UserDescription 
                title={userdata[selectedCardIndex].title} 
                img={userdata[selectedCardIndex].img} 
                des={userdata[selectedCardIndex].description} 
                budget={userdata[selectedCardIndex].budget} 
                age={userdata[selectedCardIndex].age} 
                height={userdata[selectedCardIndex].height} 
                gender={userdata[selectedCardIndex].gender} 
                location={userdata[selectedCardIndex].location} 
                day={userdata[selectedCardIndex].shootdays} 
                crew={userdata[selectedCardIndex].crew} 
                username={userdata[selectedCardIndex].username} 
              /> 
            ) 
          }
        </div>
      </div> 
    </div> 
  ); 
} 

export default Calls;
