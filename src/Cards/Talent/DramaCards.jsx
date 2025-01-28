// import React, { useEffect, useState } from "react";
// import { ImSpinner2 } from "react-icons/im";
// import { IoMailOutline } from "react-icons/io5";
// import { collection, query, where, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";
// import { db } from "../../Services/Firebase.jsx";
// import { useAuth } from "../../Context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";

// const TalentCards = ({
//   image,
//   firstName,
//   categoryName,
//   docID,
//   network,
//   onConnect,
//   onFollow,
//   production,
//   landingtalent
// }) => {
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('Connect');
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   const handleProfile = (uid) => {
//     navigate(`/userprofile/${uid}`);
//   };

//   const fetchConnectionStatus = async () => {
//     if (!currentUser) return;

//     try {
//       const currentUserQuery = query(
//         collection(db, 'userCollection'),
//         where("docID", "==", currentUser.uid)
//       );
//       const currentUserSnapshot = await getDocs(currentUserQuery);

//       if (currentUserSnapshot.empty) {
//         console.error("Current user not found");
//         return;
//       }

//       const currentUserDoc = currentUserSnapshot.docs[0].data();

//       if (currentUserDoc.connected && currentUserDoc.connected.includes(docID)) {
//         setConnectionStatus('Connected');
//       } else if (currentUserDoc.requested && currentUserDoc.requested.includes(docID)) {
//         setConnectionStatus('Requested');
//       } else {
//         setConnectionStatus('Connect');
//       }
//     } catch (error) {
//       console.error("Error fetching connection status:", error);
//     }
//   };

//   useEffect(() => {
//     fetchConnectionStatus();
//   }, [docID, currentUser]);

//   const initializeChat = async () => {
//     if (!currentUser) {
//       navigate('/login');
//       return;
//     }

//     try {
//       const now = new Date();
//       const timestamp = Timestamp.now();
//       const sortTimeValue = now.getTime();

//       const formattedTime = now.toLocaleString('en-US', {
//         month: '2-digit',
//         day: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });

//       // Chat data structure for current user
//       const currentUserChatData = {
//         otherID: docID,
//         otherName: firstName,
//         otherImage: image,
//         time: formattedTime,
//         sortTime: sortTimeValue,
//         timestamp: timestamp,
//         lastActivity: timestamp
//       };

//       // Chat data structure for other user
//       const otherUserChatData = {
//         otherID: currentUser.uid,
//         otherName: currentUser.displayName || "User",
//         otherImage: currentUser.photoURL || "",
//         time: formattedTime,
//         sortTime: sortTimeValue,
//         timestamp: timestamp,
//         lastActivity: timestamp
//       };

//       // Create chat documents for both users
//       await Promise.all([
//         setDoc(doc(db, "messages", currentUser.uid, "recent_chats", docID), currentUserChatData),
//         setDoc(doc(db, "messages", docID, "recent_chats", currentUser.uid), otherUserChatData)
//       ]);

//       // Navigate to chat with selected chat data
//       navigate('/chat', { 
//         state: { 
//           selectedChat: {
//             ...currentUserChatData,
//             id: docID
//           }
//         } 
//       });
//     } catch (error) {
//       console.error("Error initializing chat:", error);
//     }
//   };

//   const handleMailClick = () => {
//     initializeChat();
//   };

//   const handleConnect = async () => {
//     if (!currentUser) {
//       navigate('/login');
//       return;
//     }

//     if (onConnect) {
//       setIsConnecting(true);
//       try {
//         const newStatus = await onConnect({
//           docID,
//           firstName,
//           image,
//           categoryName
//         });
//         if (newStatus) {
//           setConnectionStatus(newStatus);
//         }
//       } catch (error) {
//         console.error('Error connecting:', error);
//       } finally {
//         setIsConnecting(false);
//       }
//     }
//   };

//   const handleFollow = async () => {
//     if (!currentUser) {
//       navigate('/login');
//       return;
//     }

//     if (onFollow) {
//       setIsConnecting(true);
//       try {
//         const newStatus = await onFollow({
//           docID,
//           firstName,
//           image,
//           categoryName
//         });
//         if (newStatus) {
//           setConnectionStatus(newStatus);
//         }
//       } catch (error) {
//         console.error('Error following:', error);
//       } finally {
//         setIsConnecting(false);
//       }
//     }
//   };

//   return (
//     <div className="md:overflow-hidden">
//       <div className={`bg-[#ECF5FE] rounded-xl p-5 h-auto w-[255px] 
//         ${network && 'md:min-w-[255px] h-auto w-auto'} 
//         ${landingtalent && '2xl:min-h-[350px] md:min-w-[300px] rounded-xl md:w-auto md:h-auto h-[340px] w-[300px] 2xl:min-w-auto'} 
//         ${connectionStatus === 'Connect' && 'w-[222px] tracking-tighter'} 
//         min-h-min h-[250px]`}>
//         <div className="flex flex-col gap-3 space-y-2 h-full">
//           <div className={`${landingtalent && 'flex flex-col justify-center items-center text-xl gap-4'}`}>
//             <div className="flex-shrink-0">
//               <img
//                 onClick={() => handleProfile(docID)}
//                 src={image}
//                 className={`rounded-full w-20 cursor-pointer h-20 object-cover ${landingtalent && 'w-32 h-32'}`}
//                 alt="User img"
//               />
//             </div>
//             <h2 className="mt-2 text-lg font-bold">{firstName}</h2>
//             <div className="flex flex-wrap gap-2">
//               {Array.isArray(categoryName) && categoryName.map((cat, index) => (
//                 <p key={index} className="text-gray-400">{cat}</p>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-auto">
//             <button
//               onClick={() => {
//                 if (production) {
//                   handleFollow();
//                 } else {
//                   handleConnect();
//                 }
//               }}
//               disabled={
//                 isConnecting ||
//                 connectionStatus === 'Requested' ||
//                 connectionStatus === 'Connected' ||
//                 connectionStatus === 'Following'
//               }
//               className="bg-black w-full text-nowrap px-3 tracking-tighter rounded-3xl text-white py-2"
//             >
//               {isConnecting ? (
//                 <div className="flex gap-1 justify-center items-center">
//                   <ImSpinner2 className="animate-spin" />
//                   {production ? 'Following' : 'Connecting'}
//                 </div>
//               ) : (
//                 connectionStatus
//               )}
//             </button>
//             <div 
//               onClick={handleMailClick} 
//               className="ml-3 mr-3 cursor-pointer p-2 border border-gray-400 rounded-full flex justify-center items-center"
//             >
//               <IoMailOutline className="text-2xl" />
//             </div>
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
import { collection, query, where, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Services/Firebase.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { RiShareForwardLine } from "react-icons/ri";
import SharePopup from "../SharePopup.jsx";
import { getBaseUrl } from "../../config.js";
const TalentCards = ({
  image,
  firstName,
  categoryName,
  docID,
  network,
  onConnect,
  onFollow,
  production,
  landingtalent
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connect');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleProfile = (uid) => {
    navigate(`/userprofile/${uid}`);
  };

  const fetchConnectionStatus = async () => {
    if (!currentUser) return;

    try {
      // Query for current user's document
      const currentUserQuery = query(
        collection(db, 'userCollection'),
        where("docID", "==", currentUser.uid)
      );
      const currentUserSnapshot = await getDocs(currentUserQuery);

      // Query for target user's document to check received array
      const targetUserQuery = query(
        collection(db, 'userCollection'),
        where("docID", "==", docID)
      );
      const targetUserSnapshot = await getDocs(targetUserQuery);

      if (currentUserSnapshot.empty || targetUserSnapshot.empty) {
        console.error("User not found");
        return;
      }

      const currentUserDoc = currentUserSnapshot.docs[0].data();
      const targetUserDoc = targetUserSnapshot.docs[0].data();

      if (currentUserDoc.connected && currentUserDoc.connected.includes(docID)) {
        setConnectionStatus('Connected');
      } else if (currentUserDoc.requested && currentUserDoc.requested.includes(docID)) {
        setConnectionStatus('Requested');
      } else if (targetUserDoc.received && targetUserDoc.received.includes(currentUser.uid)) {
        setConnectionStatus('Requested');
      } else {
        setConnectionStatus('Connect');
      }
    } catch (error) {
      console.error("Error fetching connection status:", error);
    }
  };

  useEffect(() => {
    fetchConnectionStatus();
  }, [docID, currentUser]);

  const initializeChat = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const now = new Date();
      const timestamp = Timestamp.now();
      const sortTimeValue = now.getTime();

      const formattedTime = now.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const currentUserChatData = {
        otherID: docID,
        otherName: firstName,
        otherImage: image,
        time: formattedTime,
        sortTime: sortTimeValue,
        timestamp: timestamp,
        lastActivity: timestamp
      };

      const otherUserChatData = {
        otherID: currentUser.uid,
        otherName: currentUser.displayName || "User",
        otherImage: currentUser.photoURL || "",
        time: formattedTime,
        sortTime: sortTimeValue,
        timestamp: timestamp,
        lastActivity: timestamp
      };

      await Promise.all([
        setDoc(doc(db, "messages", currentUser.uid, "recent_chats", docID), currentUserChatData),
        setDoc(doc(db, "messages", docID, "recent_chats", currentUser.uid), otherUserChatData)
      ]);

      navigate('/chat', {
        state: {
          selectedChat: {
            ...currentUserChatData,
            id: docID
          }
        }
      });
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const handleMailClick = () => {
    initializeChat();
  };

  const handleConnect = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (onConnect) {
      setIsConnecting(true);
      try {
        const newStatus = await onConnect({
          docID,
          firstName,
          image,
          categoryName
        });
        if (newStatus) {
          setConnectionStatus(newStatus);
        }
        // Refresh connection status after connect action
        await fetchConnectionStatus();
      } catch (error) {
        console.error('Error connecting:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const handleFollow = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (onFollow) {
      setIsConnecting(true);
      try {
        const newStatus = await onFollow({
          docID,
          firstName,
          image,
          categoryName
        });
        if (newStatus) {
          setConnectionStatus(newStatus);
        }
        // Refresh connection status after follow action
        await fetchConnectionStatus();
      } catch (error) {
        console.error('Error following:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const [showShare, setShowShare] = useState(false);
  const getProfileUrl = () => {
    const baseUrl = getBaseUrl();
    return `${baseUrl}/userprofile/${docID}`;
  };




  return (
    <div className="md:overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-xl p-5 h-auto w-[255px] 
        ${network && 'md:min-w-[255px] h-auto w-auto'} 
        ${landingtalent && '2xl:min-h-[350px] md:min-w-[300px]  rounded-xl md:w-auto md:h-auto h-[340px] max-w-[300px] 2xl:min-w-auto'} 
        ${connectionStatus === 'Connect' && 'w-[222px] tracking-tighter'} 
        min-h-min h-[250px]`}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          <div className={`${landingtalent && 'flex flex-col justify-center items-center text-xl gap-4'}`}>
            <div className="flex-shrink-0">
              <div className={`flex justify-between`}>
                <img
                  onClick={() => handleProfile(docID)}
                  src={image}
                  className={`rounded-full w-20 cursor-pointer h-20 object-cover ${landingtalent && 'w-32 h-32'}`}
                  alt="User img"
                />

                <RiShareForwardLine
                  onClick={() => setShowShare(true)}
                  className={`text-3xl text-gray-400 cursor-pointer  ${landingtalent && 'hidden'}`} />
              </div>
            </div>
            <h2 className="mt-2 text-lg font-bold">{firstName}</h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(categoryName) && categoryName.map((cat, index) => (
                <p key={index} className="text-gray-400">{cat}</p>
              ))}
            </div>

          </div>
          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={() => {
                if (production) {
                  handleFollow();
                } else {
                  handleConnect();
                }
              }}
              disabled={
                isConnecting ||
                connectionStatus === 'Requested' ||
                connectionStatus === 'Connected' ||
                connectionStatus === 'Following'
              }
              className={`bg-black w-full text-nowrap px-3 tracking-tighter rounded-3xl text-white py-2 ${(connectionStatus === 'Requested' || connectionStatus === 'Connected' || connectionStatus === 'Following')
                ? 'opacity-50 cursor-not-allowed'
                : ''
                }`}
            >
              {isConnecting ? (
                <div className="flex gap-1 justify-center items-center">
                  <ImSpinner2 className="animate-spin" />
                  {production ? 'Following' : 'Connecting'}
                </div>
              ) : (
                connectionStatus
              )}
            </button>
            <div
              onClick={handleMailClick}
              className="ml-3 mr-3 cursor-pointer p-2 border border-gray-400 rounded-full flex justify-center items-center"
            >
              <IoMailOutline className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
      {showShare && (
        <SharePopup
          url={getProfileUrl()}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
};

export default TalentCards;