import React, { useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Images/land4cardimg.png';

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
      casting:"true",
      date:"2 days ago",
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
      cast:"true",
      date:"1 hour ago",

    }
      
  ];

  const handleDataSend = (data) => {
    console.log(data);
  };

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const mycasting = true;
  return (
    <div className='bg-gray-100 flex mt-1 '>
      <div className='left flex flex-col gap-1 md:w-1/3 w-full'>
        <div className='bg-white p-3'>
          <button className='bg-black px2 py-3 flex justify-center items-center gap-2 rounded-full text-white font-semibold w-full'><span className='text-3xl font-light'>+</span> Create Casting Call</button>
        </div>
        {
          
          userdata.map((data, index) => (
            <div key={index} onClick={() => setSelectedCardIndex(index)}>
              <UserCard {...data} mycasting = {mycasting} isSelected = {selectedCardIndex === index}/>
            </div>
          ))
        }
      </div>
      <div className='right md:block hidden flex-grow'>
        <div className="px-1">
          {
            selectedCardIndex !== null && (
              <UserDescription
                // {...userdata}
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
                // cast={userdata[selectedCardIndex].username}
                // date={userdata[selectedCardIndex].date}
                {...userdata[selectedCardIndex]}
                mycasting={mycasting}
                sendData={handleDataSend}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default MyCasting;
