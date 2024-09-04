import React, { useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Images/land4cardimg.png';

const MyCasting = () => {
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
      casting:"true"
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
      cast:"true"

    }
      
  ];

  const [selectedCardIndex, setSelectedCardIndex] = useState([0]);

  return (
    <div className='bg-gray-100 flex p-1 mt-1 rounded'>
        <h1></h1>
      <div className='left flex flex-col gap-2 w-1/3'>
        {
          userdata.map((data, index) => (
            <div key={index} onClick={() => setSelectedCardIndex(index)}>
              <UserCard {...data} />
            </div>
          ))
        }
      </div>
      <div className='right flex-grow'>
        <div className="px-2">
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
                cast={userdata[selectedCardIndex].username}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default MyCasting;
