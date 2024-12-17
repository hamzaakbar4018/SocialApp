// import { useEffect, useState } from "react";
// import { ImSpinner2 } from "react-icons/im";
// import { IoMailOutline } from "react-icons/io5";

// const TalentCards = ({
//   image,
//   firstName,
//   categoryName,
//   docID,
//   connect,
//   landingtalent,
//   network,
//   onConnect,
//   onFollow,
//   connectionStatus: initialConnectionStatus,
//   production
// }) => {
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus);
//   const getConnectionStatus = (user) => {
//     const dataToUse = network ? reqData : talentData;

//     if (user.received && user.received.includes(dummyId)) {
//       return 'requested';
//     }

//     if (user.connected && user.connected.includes(dummyId)) {
//       return 'connected';
//     }

//     return 'connect';
//   };

//   useEffect(() => {
//     // Retrieve connection status from local storage
//     const storedStatus = localStorage.getItem(`connectionStatus_${docID}`);
//     if (storedStatus) {
//       setConnectionStatus(storedStatus);
//     }
//   }, [docID]);

//   const handleConnect = async () => {
//     if (onConnect) {
//       setIsConnecting(true);
//       try {
//         const newStatus = await onConnect({
//           docID,
//           firstName,
//           image,
//           categoryName
//         });

//         setConnectionStatus(newStatus);
//       } catch (error) {
//         console.error('Error connecting:', error);
//         // Handle error, e.g., display an error message to the user
//       } finally {
//         setIsConnecting(false);
//       }
//     }
//   };

//   const handleFollow = async () => {
//     if (onFollow) {
//       setIsConnecting(true);
//       try {
//         const newStatus = await onFollow({
//           docID,
//           firstName,
//           image,
//           categoryName
//         });

//         setConnectionStatus(newStatus);

//         // Store the connection status in local storage
//         localStorage.setItem(`connectionStatus_${docID}`, newStatus);
//       } catch (error) {
//         console.error('Error following:', error);
//         // Optionally, you could add error handling like showing a toast or error message
//       } finally {
//         setIsConnecting(false);
//       }
//     }
//   };


//   return (
//     <div className="md:overflow-hidden">
//       <div className={`bg-[#ECF5FE] rounded-2xl p-5 h-auto w-[255px] 
//         ${network && 'md:min-w-[255px] h-auto w-auto'} 
//         ${landingtalent && '2xl:min-h-[433px] md:min-w-auto md:h-auto h-[340px] w-[300px] 2xl:min-w-[356px]'} 
//         ${connect && 'w-[222px] tracking-tighter'} 
//         min-h-min h-[250px] `}>
//         <div className="flex flex-col gap-3 space-y-2 h-full">
//           {landingtalent ? (
//             <div className="flex md:gap-0 gap-2 flex-col mt-3 justify-center items-center">
//               <img
//                 src={image}
//                 className="rounded-full w-20 h-20 2xl:w-40 2xl:h-40"
//                 alt="User img"
//               />
//               <h2 className="2xl:mt-8 mt-4 2xl:text-2xl font-bold text-center">{firstName}</h2>
//               {
//                 Array.isArray(categoryName) && categoryName.map((cat, index) => (
//                   <p key={index} className="text-gray-400 2xl:mt-5 2xl:text-xl text-center">{cat}</p>
//                 ))
//               }
//             </div>
//           ) : (
//             <div>
//               <div className="flex-shrink-0">
//                 <img
//                   src={image}
//                   className="rounded-full w-20 h-20 object-cover"
//                   alt="User img"
//                 />
//               </div>
//               <h2 className="mt-2 text-lg font-bold">{firstName}</h2>
//               <div className="flex flex-wrap gap-2">
//               {
//                 Array.isArray(categoryName) && categoryName.map((cat, index) => (
//                   <p key={index} className="text-gray-400">{cat}</p>
//                 ))
//               }
//               </div>
//             </div>
//           )}
//           <div className="flex justify-between items-center mt-auto">
//             <button
//               onClick={() => {
//                 handleConnect();
//                 handleFollow();
//               }}
//               disabled={isConnecting || connectionStatus === 'requested' || connectionStatus === 'connected' || isConnecting || connectionStatus === 'Following'}
//               className={`bg-black ${landingtalent ? '2xl:min-w-[248px] w-full 2xl:text-2xl 2xl:mt-5' : 'w-full text-nowrap rounded-full px-3 tracking-tighter'} rounded-3xl text-white py-2`}
//             >
//               {
//                 network ? (
//                   "Connected"
//                 ) : production ? (
//                   isConnecting ? (
//                     <div className="flex gap-1 justify-center items-center">
//                       <ImSpinner2 className="animate-spin" />
//                       Following
//                     </div>
//                   ) : (
//                     connectionStatus
//                   )
//                 ) : isConnecting ? (
//                   <div className="flex gap-1 justify-center items-center">
//                     <ImSpinner2 className="animate-spin" />
//                     Connecting
//                   </div>
//                 ) : (
//                   connectionStatus
//                 )
//               }



//             </button>
//             {landingtalent ? (
//               <div className="rounded-full border 2xl:mt-5 p-2 ml-3">
//                 <IoMailOutline className="2xl:text-4xl text-3xl" />
//               </div>
//             ) : (
//               <div className="ml-3 mr-3 p-2 border border-gray-400 rounded-full flex justify-center items-center">
//                 <IoMailOutline className="text-2xl" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TalentCards;
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline } from "react-icons/io5";
import { db } from "../../Services/Firebase"; // Adjust the import path as needed
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const TalentCards = ({
  image,
  firstName,
  categoryName,
  docID,
  connect,
  landingtalent,
  network,
  onConnect,
  onFollow,
  connectionStatus: initialConnectionStatus,
  production
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus || "Follow");
  const dummyId = "YTHetwednqeLYoraizuJ4PLFFlp2"; // Make sure this matches the ID in your main component
  const handleConnect = async () => {
    if (onConnect) {
      setIsConnecting(true);
      try {
        const newStatus = await onConnect({
          docID,
          firstName,
          image,
          categoryName
        });

        setConnectionStatus(newStatus);
      } catch (error) {
        console.error('Error connecting:', error);
        // Handle error, e.g., display an error message to the user
      } finally {
        setIsConnecting(false);
      }
    }
  };

  useEffect(() => {
    // Fetch follow status from Firebase when component mounts
    const fetchFollowStatus = async () => {
      try {
        // Reference to the current user's document
        const userDocRef = doc(db, 'userCollection', dummyId);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const followList = userData.follow || [];
          
          // Check if the current production house/talent is in the follow list
          const isFollowing = followList.includes(docID);
          
          setConnectionStatus(isFollowing ? 'Following' : 'Follow');
        }
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [docID]);

  const handleFollow = async () => {
    if (onFollow) {
      setIsConnecting(true);
      try {
        // Reference to the current user's document
        const userDocRef = doc(db, 'userCollection', dummyId);
        
        // Get current user's document
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const followList = userData.follow || [];
          
          // Check if already following
          const isCurrentlyFollowing = followList.includes(docID);
          
          if (isCurrentlyFollowing) {
            // Unfollow logic
            await updateDoc(userDocRef, {
              follow: arrayRemove(docID)
            });
            setConnectionStatus('Follow');
          } else {
            // Follow logic
            await updateDoc(userDocRef, {
              follow: arrayUnion(docID)
            });
            setConnectionStatus('Following');
          }
        }
      } catch (error) {
        console.error('Error following/unfollowing:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <div className="md:overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-2xl p-5 h-auto w-[255px] 
        ${network && 'md:min-w-[255px] h-auto w-auto'} 
        ${landingtalent && '2xl:min-h-[433px] md:min-w-auto md:h-auto h-[340px] w-[300px] 2xl:min-w-[356px]'} 
        ${connect && 'w-[222px] tracking-tighter'} 
        min-h-min h-[250px] `}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          {landingtalent ? (
            <div className="flex md:gap-0 gap-2 flex-col mt-3 justify-center items-center">
              <img
                src={image}
                className="rounded-full w-20 h-20 2xl:w-40 2xl:h-40"
                alt="User img"
              />
              <h2 className="2xl:mt-8 mt-4 2xl:text-2xl font-bold text-center">{firstName}</h2>
              {
                Array.isArray(categoryName) && categoryName.map((cat, index) => (
                  <p key={index} className="text-gray-400 2xl:mt-5 2xl:text-xl text-center">{cat}</p>
                ))
              }
            </div>
          ) : (
            <div>
              <div className="flex-shrink-0">
                <img
                  src={image}
                  className="rounded-full w-20 h-20 object-cover"
                  alt="User img"
                />
              </div>
              <h2 className="mt-2 text-lg font-bold">{firstName}</h2>
              <div className="flex flex-wrap gap-2">
              {
                Array.isArray(categoryName) && categoryName.map((cat, index) => (
                  <p key={index} className="text-gray-400">{cat}</p>
                ))
              }
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={handleFollow}
              disabled={isConnecting}
              className={`bg-black ${landingtalent ? '2xl:min-w-[248px] w-full 2xl:text-2xl 2xl:mt-5' : 'w-full text-nowrap rounded-full px-3 tracking-tighter'} rounded-3xl text-white py-2`}
            >
              {isConnecting ? (
                <div className="flex gap-1 justify-center items-center">
                  <ImSpinner2 className="animate-spin" />
                  {connectionStatus === 'Following' ? 'Unfollowing' : 'Following'}
                </div>
              ) : (
                connectionStatus
              )}
            </button>
            {landingtalent ? (
              <div className="rounded-full border 2xl:mt-5 p-2 ml-3">
                <IoMailOutline className="2xl:text-4xl text-3xl" />
              </div>
            ) : (
              <div className="ml-3 mr-3 p-2 border border-gray-400 rounded-full flex justify-center items-center">
                <IoMailOutline className="text-2xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;