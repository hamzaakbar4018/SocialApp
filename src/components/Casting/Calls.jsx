// import React, { useState, useEffect } from 'react';
// import UserCard from '../../Cards/CastingCards/UserCard';
// import UserDescription from '../../Cards/CastingCards/UserDescription';
// import { IoMdArrowBack } from "react-icons/io";
// import Loader from '../Loader/Loader';
// import useFetchCastingCall from '../../Hooks/useFetchCastingCall';
// import NoDataFound from '../Loader/NoData';
// import { useLocation } from 'react-router-dom'; // Import useLocation for query params

// const Calls = () => {
//   const { isLoading, allCallsNUsers } = useFetchCastingCall(); // Fetch all calls and users
//   const [filteredCalls, setFilteredCalls] = useState([]); // Manage filtered data
//   const [selectedCardIndex, setSelectedCardIndex] = useState(0);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   const location = useLocation(); // Hook to get query parameters from URL

//   // Extract the "q" parameter from the query string
//   const searchQuery = new URLSearchParams(location.search).get('q') || ''; // Default to empty string

//   // Filtering logic
//   useEffect(() => {
//     if (!isLoading) {
//       if (searchQuery.trim()) {
//         const lowercasedQuery = searchQuery.toLowerCase();
//         const filtered = allCallsNUsers.filter((call) =>
//           call.title?.toLowerCase().includes(lowercasedQuery) || // Filter by title
//           call.roleTitle?.toLowerCase().includes(lowercasedQuery) || // Filter by roleTitle
//           call.city?.toLowerCase().includes(lowercasedQuery) || // Filter by city
//           call.user?.firstName?.toLowerCase().includes(lowercasedQuery) // Filter by user's first name
//         );
//         setFilteredCalls(filtered); // Update filtered calls
//       } else {
//         setFilteredCalls(allCallsNUsers); // No query, show all calls
//       }
//     }
//   }, [searchQuery, allCallsNUsers, isLoading]); // Re-run when query, data, or loading status changes

//   // Render Loader, No Data Found, or the filtered results
//   return isLoading ? (
//     <Loader />
//   ) : filteredCalls.length > 0 ? (
//     <div className="flex mt-1">
//       {/* Left Column: User Cards */}
//       <div className="left overflow-y-auto h-screen flex bg-white flex-col gap-2 w-full md:w-1/3">
//         {filteredCalls.map((data, index) => (
//           <div
//             key={index}
//             onClick={() => {
//               setSelectedCardIndex(index);
//               setIsSheetOpen(true);
//             }}
//           >
//             <UserCard
//               {...data}
//               type={data.roleTitle}
//               day={data.duration}
//               location={data.city}
//               img={data.user.image}
//               isSelected={selectedCardIndex === index}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right Column: Description */}
//       <div className="right md:block hidden flex-grow">
//         <div className="pl-1">
//           {selectedCardIndex !== null && selectedCardIndex < filteredCalls.length && (
//             <UserDescription
//               type={filteredCalls[selectedCardIndex].roleTitle}
//               callId={filteredCalls[selectedCardIndex].docID}
//               title={filteredCalls[selectedCardIndex].title}
//               img={filteredCalls[selectedCardIndex].user.image}
//               des={filteredCalls[selectedCardIndex].description}
//               budget={filteredCalls[selectedCardIndex].budget}
//               age={filteredCalls[selectedCardIndex].age}
//               height={filteredCalls[selectedCardIndex].height}
//               gender={filteredCalls[selectedCardIndex].gender}
//               location={filteredCalls[selectedCardIndex].city}
//               day={filteredCalls[selectedCardIndex].duration}
//               crew={filteredCalls[selectedCardIndex].crew}
//               username={filteredCalls[selectedCardIndex].user.firstName}
//               time={filteredCalls[selectedCardIndex].createdAt}
//             />
//           )}
//         </div>
//       </div>

//       {/* Sliding Sheet for Mobile */}
//       <div
//         className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${
//           isSheetOpen ? 'translate-x-0' : 'translate-x-full'
//         } md:hidden w-full sm:w-2/3`}
//       >
//         <button
//           className="absolute top-0 left-0 bg-white w-full p-4 text-black"
//           onClick={() => setIsSheetOpen(false)}
//         >
//           <IoMdArrowBack className="text-2xl mb-1 mt-3" />
//         </button>
//         <div className="">
//           {selectedCardIndex !== null && selectedCardIndex < filteredCalls.length && (
//             <UserDescription
//               type={filteredCalls[selectedCardIndex].roleTitle}
//               title={filteredCalls[selectedCardIndex].title}
//               img={filteredCalls[selectedCardIndex].user.image}
//               des={filteredCalls[selectedCardIndex].description}
//               budget={filteredCalls[selectedCardIndex].budget}
//               age={filteredCalls[selectedCardIndex].age}
//               height={filteredCalls[selectedCardIndex].height}
//               gender={filteredCalls[selectedCardIndex].gender}
//               location={filteredCalls[selectedCardIndex].city}
//               day={filteredCalls[selectedCardIndex].duration}
//               crew={filteredCalls[selectedCardIndex].crew}
//               username={filteredCalls[selectedCardIndex].user.firstName}
//               time={filteredCalls[selectedCardIndex].createdAt}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   ) : (
//     <NoDataFound />
//   );
// };

// export default Calls;
import React, { useState, useEffect } from 'react';
import UserCard from '../../Cards/CastingCards/UserCard';
import UserDescription from '../../Cards/CastingCards/UserDescription';
import { IoMdArrowBack } from "react-icons/io";
import Loader from '../Loader/Loader';
import useFetchCastingCall from '../../Hooks/useFetchCastingCall';
import NoDataFound from '../Loader/NoData';
import { useLocation } from 'react-router-dom';

const Calls = () => {
  const { isLoading, allCallsNUsers } = useFetchCastingCall();
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (!isLoading && allCallsNUsers) {
      if (searchQuery.trim()) {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allCallsNUsers.filter((call) =>
          call.title?.toLowerCase().includes(lowercasedQuery) ||
          call.roleTitle?.toLowerCase().includes(lowercasedQuery) ||
          call.city?.toLowerCase().includes(lowercasedQuery) ||
          call.user?.firstName?.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredCalls(filtered);
      } else {
        setFilteredCalls(allCallsNUsers);
      }
    }
  }, [searchQuery, allCallsNUsers, isLoading]);

  return isLoading ? (
    <Loader />
  ) : filteredCalls.length > 0 ? (
    <div className="flex mt-1">
      <div className="left overflow-y-auto h-screen flex bg-white flex-col gap-2 w-full md:w-1/3">
        {filteredCalls.map((data, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCardIndex(index);
              setIsSheetOpen(true);
            }}
          >
            <UserCard
              {...data}
              type={data.roleTitle}
              day={data.duration}
              location={data.city}
              img={data.user?.image}
              isSelected={selectedCardIndex === index}
            />
          </div>
        ))}
      </div>

      <div className="right md:block hidden flex-grow">
        <div className="pl-1">
          {selectedCardIndex !== null && selectedCardIndex < filteredCalls.length && (
            <UserDescription
              type={filteredCalls[selectedCardIndex].roleTitle}
              callId={filteredCalls[selectedCardIndex].docID}
              title={filteredCalls[selectedCardIndex].title}
              img={filteredCalls[selectedCardIndex].user?.image}
              des={filteredCalls[selectedCardIndex].description}
              budget={filteredCalls[selectedCardIndex].budget}
              age={filteredCalls[selectedCardIndex].age}
              height={filteredCalls[selectedCardIndex].height}
              gender={filteredCalls[selectedCardIndex].gender}
              location={filteredCalls[selectedCardIndex].city}
              day={filteredCalls[selectedCardIndex].duration}
              crew={filteredCalls[selectedCardIndex].crew}
              username={filteredCalls[selectedCardIndex].user?.firstName}
              time={filteredCalls[selectedCardIndex].createdAt}
            />
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${
          isSheetOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden w-full sm:w-2/3`}
      >
        <button
          className="absolute top-0 left-0 bg-white w-full p-4 text-black"
          onClick={() => setIsSheetOpen(false)}
        >
          <IoMdArrowBack className="text-2xl mb-1 mt-3" />
        </button>
        <div className="">
          {selectedCardIndex !== null && selectedCardIndex < filteredCalls.length && (
            <UserDescription
              type={filteredCalls[selectedCardIndex].roleTitle}
              title={filteredCalls[selectedCardIndex].title}
              img={filteredCalls[selectedCardIndex].user?.image}
              des={filteredCalls[selectedCardIndex].description}
              budget={filteredCalls[selectedCardIndex].budget}
              age={filteredCalls[selectedCardIndex].age}
              height={filteredCalls[selectedCardIndex].height}
              gender={filteredCalls[selectedCardIndex].gender}
              location={filteredCalls[selectedCardIndex].city}
              day={filteredCalls[selectedCardIndex].duration}
              crew={filteredCalls[selectedCardIndex].crew}
              username={filteredCalls[selectedCardIndex].user?.firstName}
              time={filteredCalls[selectedCardIndex].createdAt}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <NoDataFound />
  );
};

export default Calls;