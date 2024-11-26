import React, { useEffect, useState } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import land4cardimg from '../../assets/Icons SVG/land4cardimg.png';
import { IoMdArrowBack } from "react-icons/io";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Loader from '../Loader/Loader'
import { query, where } from 'firebase/firestore';

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
      date: "1,Dec 2023"
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
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);



  const fetchCastingCall = async () => {
    setIsLoading(true);

    try {
      // Fetch casting calls
      const querySnapshot = await getDocs(collection(db, "castingCallCollection"));
      const calls = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Extract author IDs from the casting calls
      const authorIDs = calls.map(doc => doc.authorID);

      let usersDetails = [];
      console.log("CHECK IDs",authorIDs)
      // If there are author IDs, fetch corresponding users
      if (authorIDs.length > 0) {
        // Create a query to fetch users whose authorID is in the list of authorIDs
        const usersQuery = query(
          collection(db, "userCollection"),
          where("docID", "in", authorIDs) // Make sure 'authorID' is the field in your user collection
        );

        // Fetch the user documents
        const userQuerySnapshot = await getDocs(usersQuery);

        // Extract user details
        usersDetails = userQuerySnapshot.docs.map(doc => doc.data());
        console.log(usersDetails)
      }

      // Combine user details with the corresponding casting call data
      const combinedData = calls.map(call => {
        const author = usersDetails.find(user => user.authorID === call.authorID); // Find the corresponding user
        return {
          ...call,
          authorInfo: author || null, // Add author information to the call data
        };
      });

      setUserData(combinedData);
      console.log("ALL DATA", combinedData);
    } catch (error) {
      console.error("Error fetching casting calls or user details:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchCastingCall();
  }, [])

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const callpage = false;
  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className='flex mt-1'>
        {/* Left Section (Card List) */}
        <div className='left flex bg-white flex-col gap-2 w-full md:w-1/3'>
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
                  img={userData[selectedCardIndex].img || null}
                  des={userData[selectedCardIndex].description}
                  budget={userData[selectedCardIndex].budget}
                  age={userData[selectedCardIndex].age}
                  height={userData[selectedCardIndex].height}
                  gender={userData[selectedCardIndex].gender}
                  location={userData[selectedCardIndex].city}
                  day={userData[selectedCardIndex].shootdays}
                  crew={userData[selectedCardIndex].crew}
                  username={userData[selectedCardIndex].username || "Anonymous"}
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
                  img={userData[selectedCardIndex].img || null}
                  des={userData[selectedCardIndex].description}
                  budget={userData[selectedCardIndex].budget}
                  age={userData[selectedCardIndex].age}
                  height={userData[selectedCardIndex].height}
                  gender={userData[selectedCardIndex].gender}
                  location={userData[selectedCardIndex].city}
                  day={userData[selectedCardIndex].shootdays}
                  crew={userData[selectedCardIndex].crew}
                  username={userData[selectedCardIndex].username || "Anonymous"}
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
