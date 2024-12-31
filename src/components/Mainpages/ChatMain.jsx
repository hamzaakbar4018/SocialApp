// import { useContext, useEffect, useRef, useState } from "react";;
// import Rightbar from "../Rightbar";
// import Arrow from '../../assets/Icons SVG/Arrow.svg'
// import AllUsers from "../../Cards/Chat/AllUsers";
// import UsersChat from "../../Cards/Chat/UsersChat";
// import searchi from '../../assets/Icons SVG/Search.svg'
// import Notifications from '../../assets/Icons SVG/Notifications.svg'
// import Edit from '../../assets/Icons SVG/Edit.svg'
// import Sidebar from '../Sidebar.jsx'
// import { FiMenu } from 'react-icons/fi';
// import { NotificatinData } from '../../Context/NotificatinContext.jsx';
// import { IoMdArrowBack } from "react-icons/io";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { useLocation } from "react-router-dom";
// import { LuPencil } from "react-icons/lu";
// import { useAuth } from '../../Context/AuthContext.jsx';
// import { collection, doc, getDoc, getDocs, query, where, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
// import { db } from "../../Services/Firebase.jsx";
// import Loader from "../Loader/Loader.jsx";

// const ChatMain = () => {
//   const { currentUser } = useAuth();
//   const timeNow = Timestamp.now();
//   const userID = currentUser.uid
//   const [recentChats, setRecentChats] = useState([]);
//   const [usersData, setUsersData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [usersCharMsgs, setUsersCharMsgs] = useState([]);
//   const [selectedChatId, setSelectedChatId] = useState(null);
//   // Helper function to format Firestore Timestamp
//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return 'Unknown time';

//     // Check if timestamp is a Firestore Timestamp
//     if (timestamp instanceof Timestamp) {
//       return timestamp.toDate().toLocaleString('en-US', {
//         month: '2-digit',
//         day: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     }

//     // If it's already a string or other format, return as is
//     if (typeof timestamp === 'string') {
//       return timestamp;
//     }

//     // If it's an object with seconds and nanoseconds
//     if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
//       const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
//       return date.toLocaleString('en-US', {
//         month: '2-digit',
//         day: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     }

//     return 'Unknown time';
//   };
//   useEffect(() => {
//     const fetchRecentChats = () => {
//       try {
//         setIsLoading(true);
//         const recentChatsRef = collection(db, "messages", userID, "recent_chats");
//         const recentChatsQuery = query(recentChatsRef, orderBy("time", "desc"));

//         const unsubscribe = onSnapshot(
//           recentChatsQuery,
//           async (snapshot) => {
//             const recentChatsIds = snapshot.docs.map((docSnap) => ({
//               id: docSnap.id,
//               data: {
//                 ...docSnap.data(),
//                 time: formatTimestamp(docSnap.data().time),
//               },
//             }));

//             if (recentChatsIds.length > 0) {
//               setRecentChats(recentChatsIds);

//               // Fetch each chat's messages
//               const userMessagesPromises = recentChatsIds.map(async (chat) => {
//                 const messagesRef = collection(
//                   db,
//                   "messages",
//                   userID,
//                   "recent_chats",
//                   chat.id,
//                   "messages"
//                 );
//                 const messagesSnapshot = await getDocs(messagesRef);
//                 const messages = messagesSnapshot.docs.map((messageDoc) => ({
//                   id: messageDoc.id,
//                   data: {
//                     ...messageDoc.data(),
//                     time: formatTimestamp(messageDoc.data().time),
//                   },
//                 }));
//                 return {
//                   id: chat.id,
//                   data: chat.data,
//                   messages,
//                 };
//               });

//               const usersCharMsgs = await Promise.all(userMessagesPromises);
//               setUsersCharMsgs(usersCharMsgs);

//               // Fetch user data for each recent chat
//               const userPromises = recentChatsIds.map(async (element) => {
//                 const getUserDataSnapshot = await getDoc(
//                   doc(db, "users", element.id)
//                 );
//                 if (getUserDataSnapshot.exists()) {
//                   const userData = getUserDataSnapshot.data();
//                   return { id: getUserDataSnapshot.id, data: userData };
//                 }
//                 return null;
//               });

//               const usersData = await Promise.all(userPromises);
//               setUsersData(usersData.filter((user) => user !== null));
//             }
//             setIsLoading(false);
//           },
//           (error) => {
//             console.error("Error fetching recent chats:", error);
//             setIsLoading(false);
//           }
//         );

//         return unsubscribe;
//       } catch (error) {
//         console.error("Error setting up listener:", error);
//         setIsLoading(false);
//       }
//     };

//     const unsubscribe = fetchRecentChats();
//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, [userID]);

//   // Whenever recentChats changes, figure out the new index of the currently selected chat
//   useEffect(() => {
//     if (selectedChatId && recentChats.length > 0) {
//       const newIndex = recentChats.findIndex((chat) => chat.id === selectedChatId);
//       if (newIndex !== -1) {
//         setSelectedCardIndex(newIndex);
//       } else {
//         // If not found, you might want to reset or do something else
//         setSelectedCardIndex(null);
//       }
//     }
//   }, [recentChats, selectedChatId]);
//   const notifyData = useContext(NotificatinData);
//   const [popup, setpopup] = useState(false);
//   const handlePopup = () => {
//     setpopup(!popup)
//   }
//   const [showSidebar, setShowSidebar] = useState(false);
//   const handleSidebarToggle = () => {
//     setShowSidebar(!showSidebar);
//   };
//   const [showRightbar, setShowRightbar] = useState(false);
//   const [search, setSearch] = useState(false);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(0);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearch(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [searchRef]);

//   const staticChatData = [
//     {
//       id: 1,
//       userImg: "https://randomuser.me/api/portraits/men/1.jpg",
//       username: "Muhammad Ali",
//       msg: {
//         unread: true,
//         text: "Hello how are you?",
//         totalmsg: 1,
//       },
//       received: {
//         received: true,
//         msg: "Hello this is test msg for receiving.",
//       },
//       sent: {
//         sent: true,
//         msg: "Hello this is test msg for sending.",
//       },
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       userImg: "https://randomuser.me/api/portraits/women/2.jpg",
//       username: "Saira",
//       msg: {
//         unread: false,
//         text: "I am fine, thanks!",
//         totalmsg: 2,
//       },
//       received: {
//         received: true,
//         msg: "yooo",
//       },
//       sent: {
//         sent: true,
//         msg: "Glad to hear from you!",
//       },
//       time: "30 minutes ago",
//     },
//     {
//       id: 3,
//       userImg: "https://randomuser.me/api/portraits/men/3.jpg",
//       username: "Abuzar",
//       msg: {
//         unread: true,
//         text: "Haha hell yeh",
//         totalmsg: 3,
//       },
//       received: {
//         received: true,
//         msg: "I agree with you!",
//       },
//       sent: {
//         sent: true,
//         msg: "That's awesome!",
//       },
//       time: "1 day ago",
//     },
//     {
//       id: 4,
//       userImg: "https://randomuser.me/api/portraits/women/4.jpg",
//       username: "Sara",
//       msg: {
//         unread: true,
//         text: "Are you available for a meeting?",
//         totalmsg: 5,
//       },
//       received: {
//         received: false,
//         msg: "ABC",
//       },
//       sent: {
//         sent: true,
//         msg: "I will get back to you soon.",
//       },
//       time: "3 hours ago",
//     },
//   ];

//   const handleBar = () => {
//     setShowRightbar(!showRightbar);
//   };


//   const location = useLocation();
//   const chatLocation = location.pathname === '/chat'
//   const isSmallScreen = window.innerWidth <= 640;

//   const handleSearch = () => {
//     console.log("Search button clicked");
//     setSearch(!search);
//   };
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   return (
//     <div className="flex">
//       <div className="w-full h-dvh overflow-hidden">
//         <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
//           <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span>Chat</h1>
//           {showSidebar && (
//             <dialog id="my_modal_3" className="modal" open>
//               <div className="w-full h-full ">
//                 <form method="dialog">
//                   <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
//                 </form>
//                 <Sidebar />
//               </div>
//             </dialog>
//           )}
//           {search && (
//             <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
//           )}
//           <div className={`flex ${search && 'm-3'} justify-end gap-2 md:gap-5 items-center w-full z-10`}>
//             <div
//               ref={searchRef}
//               className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'}`}
//             >
//               <img onClick={handleSearch} src={searchi} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer' alt="Search" />

//               <input
//                 onClick={handleSearch}
//                 type="search"
//                 placeholder='Search'
//                 className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${search ? 'block' : 'hidden md:flex'}`}
//               />

//               {search && (
//                 <img src={Arrow} onClick={handleSearch} className='w-9 p-1 h-9 bg-black rounded-full cursor-pointer' />
//               )}

//               {search && (
//                 <div className='bg-white absolute md:right-2 right-0 top-full mt-3 w-full md:w-[98%] rounded-lg p-4'>
//                   <div className="recent flex items-center justify-between mx-1">
//                     <div>
//                       <h2 className='text-gray-400 text-sm'>Recent</h2>
//                     </div>
//                     <div>
//                       <button className='text-[#399AF3] text-sm'>Clear all</button>
//                     </div>
//                   </div>
//                   <div className="users flex justify-between items-center m-1">
//                     <h1>Hamza Akbar</h1>
//                     <h1 className='cursor-pointer'>✕</h1>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               onClick={() => {
//                 if (window.innerWidth <= 640) {
//                   handlePopup();
//                 } else {
//                   handleBar();
//                 }
//               }}
//               className={`${search ? 'hidden' : ' rounded-full cursor-pointer p-3 mr-4 border border-gray-300'} ${chatLocation && isSmallScreen && 'bg-black border-0'}`}
//             >
//               {isSmallScreen ? (
//                 chatLocation ? (
//                   <LuPencil className="text-white text-xl" />
//                 ) : (
//                   <img src={Notifications} alt="Notifications" />
//                 )
//               ) : (
//                 <img src={Notifications} alt="Notifications" /> // Default icon for larger screens
//               )}
//             </div>
//             {
//               popup && (
//                 <div className='bg-black bg-opacity-50 inset-0 fixed top-0'>
//                   <dialog className="modal" open>
//                     <div className="bg-white h-screen p-0">
//                       <button
//                         className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
//                         onClick={handlePopup}
//                       >
//                         ✕
//                       </button>
//                       <div className="border-b mb-3 px-6 pt-6 border-gray-300">
//                         <h3 className="font-bold mb-4 text-lg">Notifications</h3>
//                       </div>
//                       <div className="px-6 flex mb-2 flex-col justify-center gap-3">
//                         {notifyData.map((data, index) => (
//                           <div className="flex items-center gap-2" key={index}>
//                             <img
//                               className="w-14 h-14 rounded-full"
//                               src={data.image}
//                               alt="image"
//                             />
//                             <div className="flex flex-col justify-center">
//                               <h1 className="font-semibold">
//                                 {data.username} <span className="font-light">{data.text}</span>
//                               </h1>
//                               <p className="text-[#9B9B9B] text-sm">{data.time}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </dialog>
//                 </div>
//               )
//             }

//           </div>


//         </div>
//         {
//           isLoading ? (
//             <Loader />
//           ) : (
//             <div
//               className={`showcard transition-all  flex-1 overflow-hidden ${showRightbar ? "mr-[1%]" : "mr-0"
//                 } flex`}
//               style={{ height: "calc(100dvh - 5.2rem)" }}
//             >
//               <div className="left p-[4px] bg-[#F5F5F5]  w-full md:w-auto md:min-w-[25%]  rounded overflow-y-auto ">
//                 {recentChats.map((usr, index) => (
//                   <AllUsers
//                     key={usr.id}
//                     otherName={usr.data.otherName}
//                     otherImage={usr.data.otherImage}
//                     otherID={usr.data.otherID}
//                     recentMessage={usr.data.recentMessage}
//                     time={usr.data.time} // This should now be a formatted string
//                     isActive={selectedCardIndex === index}
//                     isSelected={selectedCardIndex === index}
//                     onClick={() => {
//                       setSelectedChatId(usr.id);
//                       setSelectedCardIndex(index);
//                       setIsSheetOpen(true)
//                     }}
//                   />
//                 ))}
//               </div>
//               {/* chat */}
//               <div
//                 className="right py-[4px] px-[2px] bg-[#F5F5F5] hidden min-h-full flex-shrink md:block flex-grow"
//                 style={{ maxHeight: "calc(100vh - 4rem)" }}
//               >
//                 {recentChats && recentChats.length > 0 && selectedCardIndex !== null && (
//                   <UsersChat
//                     userImg={recentChats[selectedCardIndex]?.data?.otherImage}
//                     username={recentChats[selectedCardIndex]?.data?.otherName}
//                     time={recentChats[selectedCardIndex]?.data?.time}
//                     usersCharMsgs={usersCharMsgs}
//                     selectedCardIndex={selectedCardIndex}
//                     recentChats={recentChats}
//                   />
//                 )}
//               </div>

//               <div className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full sm:w-2/3`}>
//                 <button
//                   className="absolute flex items-center border-b border-gray-300 justify-between gap-2 top-0 left-0 bg-white w-full p-4 text-black"
//                   onClick={() => setIsSheetOpen(false)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <IoMdArrowBack className='text-2xl mb-1 mt-3' />
//                     <div className="flex gap-2 items-center">
//                       <img
//                         src={recentChats[selectedCardIndex]?.data?.otherImage}
//                         alt="User Image"
//                         className="w-[59px] h-[59px] rounded-full"
//                       />
//                       <div className="flex flex-col items-start">
//                         <h1 className="font-bold">{recentChats[selectedCardIndex]?.data?.otherName}</h1>
//                         <p>{recentChats[selectedCardIndex]?.data?.time}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className='flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center'>
//                       <HiOutlineDotsVertical className="font-bold text-2xl" />
//                     </div>
//                   </div>

//                 </button>

//                 <div className="">
//                   {recentChats && recentChats.length > 0 && selectedCardIndex !== null && (
//                     <UsersChat
//                       userImg={recentChats[selectedCardIndex]?.data?.otherImage}
//                       username={recentChats[selectedCardIndex]?.data?.otherName}
//                       time={recentChats[selectedCardIndex]?.data?.time}
//                       usersCharMsgs={usersCharMsgs}
//                       selectedCardIndex={selectedCardIndex}
//                       recentChats={recentChats}
//                     />
//                   )}
//                 </div>
//               </div>

//             </div>
//           )
//         }
//       </div>

//       {showRightbar && (
//         <div className="w-[26%] h-dvh">
//           <Rightbar />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatMain;
import { useContext, useEffect, useRef, useState } from "react";
import Rightbar from "../Rightbar";
import Arrow from '../../assets/Icons SVG/Arrow.svg';
import AllUsers from "../../Cards/Chat/AllUsers";
import UsersChat from "../../Cards/Chat/UsersChat";
import searchi from '../../assets/Icons SVG/Search.svg';
import Notifications from '../../assets/Icons SVG/Notifications.svg';
import Edit from '../../assets/Icons SVG/Edit.svg';
import Sidebar from '../Sidebar.jsx';
import { FiMenu } from 'react-icons/fi';
import { NotificatinData } from '../../Context/NotificatinContext.jsx';
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { useAuth } from '../../Context/AuthContext.jsx';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../Services/Firebase.jsx";
import Loader from "../Loader/Loader.jsx";

const ChatMain = () => {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;

  // ─────────────────────────────────────────────
  // NEW: Track the selected chat by ID, not just index
  // ─────────────────────────────────────────────
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const [recentChats, setRecentChats] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersCharMsgs, setUsersCharMsgs] = useState([]);

  // For notifications, popups, sidebars, etc.
  const notifyData = useContext(NotificatinData);
  const [popup, setpopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightbar, setShowRightbar] = useState(false);
  const [search, setSearch] = useState(false);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const searchRef = useRef(null);

  // Helper function to format Firestore Timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';

    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }

    if (typeof timestamp === 'string') {
      return timestamp;
    }

    if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }

    return 'Unknown time';
  };

  // ─────────────────────────────────────────────
  // Listen for recent chats, order by "time" DESC
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchRecentChats = () => {
      try {
        setIsLoading(true);
        const recentChatsRef = collection(db, "messages", userID, "recent_chats");
        const recentChatsQuery = query(recentChatsRef, orderBy("time", "desc"));

        // Use onSnapshot for real-time updates
        const unsubscribe = onSnapshot(
          recentChatsQuery,
          async (snapshot) => {
            const recentChatsIds = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              data: {
                ...docSnap.data(),
                time: formatTimestamp(docSnap.data().time)
              },
            }));

            if (recentChatsIds.length > 0) {
              setRecentChats(recentChatsIds);

              // Fetch messages for each chat
              const userMessagesPromises = recentChatsIds.map(async (chat) => {
                const messagesRef = collection(
                  db,
                  "messages",
                  userID,
                  "recent_chats",
                  chat.id,
                  "messages"
                );
                const messagesSnapshot = await getDocs(messagesRef);
                const messages = messagesSnapshot.docs.map((messageDoc) => ({
                  id: messageDoc.id,
                  data: {
                    ...messageDoc.data(),
                    time: formatTimestamp(messageDoc.data().time)
                  },
                }));

                return {
                  id: chat.id,
                  data: chat.data,
                  messages,
                };
              });

              const usersCharMsgs = await Promise.all(userMessagesPromises);
              setUsersCharMsgs(usersCharMsgs);

              // Fetch user data for each recent chat
              const userPromises = recentChatsIds.map(async (element) => {
                const getUserDataSnapshot = await getDoc(
                  doc(db, "users", element.id)
                );
                if (getUserDataSnapshot.exists()) {
                  const userData = getUserDataSnapshot.data();
                  return { id: getUserDataSnapshot.id, data: userData };
                }
                return null;
              });

              const usersData = await Promise.all(userPromises);
              setUsersData(usersData.filter((user) => user !== null));
            } else {
              // No recent chats found
              setRecentChats([]);
              setUsersCharMsgs([]);
            }
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching recent chats:", error);
            setIsLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error setting up listener:", error);
        setIsLoading(false);
      }
    };

    const unsubscribe = fetchRecentChats();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userID]);

  // ─────────────────────────────────────────────
  // Keep the same selected chat ID after reorder
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (selectedChatId && recentChats.length > 0) {
      const newIndex = recentChats.findIndex(
        (chat) => chat.id === selectedChatId
      );
      setSelectedCardIndex(newIndex !== -1 ? newIndex : null);
    } else {
      // If you want a default (open the first chat if none selected), do so here:
      // if (!selectedChatId && recentChats.length > 0) {
      //   setSelectedChatId(recentChats[0].id);
      //   setSelectedCardIndex(0);
      // }
    }
  }, [recentChats, selectedChatId]);

  // ─────────────────────────────────────────────
  // Example: handle send message
  // ─────────────────────────────────────────────
  // This shows how to update the Firestore 'time' so the chat reorders to index 0.
  const handleSendMessage = async (otherUserId, textMessage) => {
    try {
      // 1) Add a new message to subcollection
      const timeNow = Timestamp.now();
      await addDoc(
        collection(db, "messages", userID, "recent_chats", otherUserId, "messages"),
        {
          text: textMessage,
          time: timeNow,
          senderId: userID,
        }
      );
      // 2) Update the parent's "time" and "recentMessage" so that chat goes to top
      await updateDoc(
        doc(db, "messages", userID, "recent_chats", otherUserId),
        {
          time: timeNow,
          recentMessage: textMessage,
        }
      );

      // If you also want the receiving user to see it at the top, do the same for them:
      await addDoc(
        collection(db, "messages", otherUserId, "recent_chats", userID, "messages"),
        {
          text: textMessage,
          time: timeNow,
          senderId: userID,
        }
      );
      await updateDoc(
        doc(db, "messages", otherUserId, "recent_chats", userID),
        {
          time: timeNow,
          recentMessage: textMessage,
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Popup, sidebar, and search handlers
  const handlePopup = () => {
    setpopup(!popup);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleBar = () => {
    setShowRightbar(!showRightbar);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const location = useLocation();
  const chatLocation = location.pathname === '/chat';
  const isSmallScreen = window.innerWidth <= 640;

  return (
    <div className="flex">
      <div className="w-full h-dvh overflow-hidden">
        {/* Navbar / Top Section */}
        <div className="flex px-0 bg-white justify-between items-center border-b py-4">
          <h1
            onClick={handleSidebarToggle}
            className={`${
              search ? "hidden" : "text-xl font-bold items-center p-3 flex gap-2"
            }`}
          >
            <span className="md:hidden block">
              <FiMenu className="text-3xl" />
            </span>
            Chat
          </h1>

          {showSidebar && (
            <dialog id="my_modal_3" className="modal" open>
              <div className="w-full h-full">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">
                    ✕
                  </button>
                </form>
                <Sidebar />
              </div>
            </dialog>
          )}

          {search && (
            <div className="fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
          )}

          <div
            className={`flex ${search && "m-3"} justify-end gap-2 md:gap-5 items-center w-full z-10`}
          >
            {/* Search Bar */}
            <div
              ref={searchRef}
              className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${
                search ? "w-full rounded-xl bg-[#F5F5F5]" : "md:w-[300px]"
              }`}
            >
              <img
                onClick={handleSearch}
                src={searchi}
                className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
                alt="Search"
              />

              <input
                onClick={handleSearch}
                type="search"
                placeholder="Search"
                className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${
                  search ? "block" : "hidden md:flex"
                }`}
              />

              {search && (
                <img
                  src={Arrow}
                  onClick={handleSearch}
                  className="w-9 p-1 h-9 bg-black rounded-full cursor-pointer"
                  alt="Close Search"
                />
              )}

              {search && (
                <div className="bg-white absolute md:right-2 right-0 top-full mt-3 w-full md:w-[98%] rounded-lg p-4">
                  <div className="recent flex items-center justify-between mx-1">
                    <div>
                      <h2 className="text-gray-400 text-sm">Recent</h2>
                    </div>
                    <div>
                      <button className="text-[#399AF3] text-sm">
                        Clear all
                      </button>
                    </div>
                  </div>
                  <div className="users flex justify-between items-center m-1">
                    <h1>Hamza Akbar</h1>
                    <h1 className="cursor-pointer">✕</h1>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications / Pencil Icon */}
            <div
              onClick={() => {
                if (window.innerWidth <= 640) {
                  handlePopup();
                } else {
                  handleBar();
                }
              }}
              className={`${
                search
                  ? "hidden"
                  : "rounded-full cursor-pointer p-3 mr-4 border border-gray-300"
              } ${chatLocation && isSmallScreen && "bg-black border-0"}`}
            >
              {isSmallScreen ? (
                chatLocation ? (
                  <LuPencil className="text-white text-xl" />
                ) : (
                  <img src={Notifications} alt="Notifications" />
                )
              ) : (
                <img src={Notifications} alt="Notifications" />
              )}
            </div>

            {/* Popup Notifications for Mobile */}
            {popup && (
              <div className="bg-black bg-opacity-50 inset-0 fixed top-0">
                <dialog className="modal" open>
                  <div className="bg-white h-screen p-0">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
                      onClick={handlePopup}
                    >
                      ✕
                    </button>
                    <div className="border-b mb-3 px-6 pt-6 border-gray-300">
                      <h3 className="font-bold mb-4 text-lg">Notifications</h3>
                    </div>
                    <div className="px-6 flex mb-2 flex-col justify-center gap-3">
                      {notifyData.map((data, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <img
                            className="w-14 h-14 rounded-full"
                            src={data.image}
                            alt="Notif"
                          />
                          <div className="flex flex-col justify-center">
                            <h1 className="font-semibold">
                              {data.username}{" "}
                              <span className="font-light">{data.text}</span>
                            </h1>
                            <p className="text-[#9B9B9B] text-sm">
                              {data.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </dialog>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`showcard transition-all flex-1 overflow-hidden ${
              showRightbar ? "mr-[1%]" : "mr-0"
            } flex`}
            style={{ height: "calc(100dvh - 5.2rem)" }}
          >
            {/* Left (Chat List) */}
            <div className="left p-[4px] bg-[#F5F5F5] w-full md:w-auto md:min-w-[25%] rounded overflow-y-auto">
              {recentChats.map((usr, index) => (
                <AllUsers
                  key={usr.id}
                  otherName={usr.data.otherName}
                  otherImage={usr.data.otherImage}
                  otherID={usr.data.otherID}
                  recentMessage={usr.data.recentMessage}
                  time={usr.data.time}
                  // Chat is active if indexes match
                  isActive={selectedCardIndex === index}
                  isSelected={selectedCardIndex === index}
                  onClick={() => {
                    // Instead of setting selectedCardIndex = index,
                    // set the selected chat ID:
                    setSelectedChatId(usr.id);
                    setIsSheetOpen(true);
                  }}
                />
              ))}
            </div>

            {/* Right (Chat Window) - Desktop */}
            <div
              className="right py-[4px] px-[2px] bg-[#F5F5F5] hidden min-h-full flex-shrink md:block flex-grow"
              style={{ maxHeight: "calc(100vh - 4rem)" }}
            >
              {recentChats && recentChats.length > 0 && selectedCardIndex !== null && (
                <UsersChat
                  userImg={recentChats[selectedCardIndex]?.data?.otherImage}
                  username={recentChats[selectedCardIndex]?.data?.otherName}
                  time={recentChats[selectedCardIndex]?.data?.time}
                  usersCharMsgs={usersCharMsgs}
                  selectedCardIndex={selectedCardIndex}
                  recentChats={recentChats}
                  // Example of how you'd pass handleSendMessage down:
                  onSendMessage={handleSendMessage}
                />
              )}
            </div>

            {/* Bottom Sheet / Drawer on Mobile */}
            <div
              className={`fixed top-0 z-40 right-0 h-full bg-white shadow-lg transition-transform transform ${
                isSheetOpen ? "translate-x-0" : "translate-x-full"
              } md:hidden w-full sm:w-2/3`}
            >
              <button
                className="absolute flex items-center border-b border-gray-300 justify-between gap-2 top-0 left-0 bg-white w-full p-4 text-black"
                onClick={() => setIsSheetOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <IoMdArrowBack className="text-2xl mb-1 mt-3" />
                  <div className="flex gap-2 items-center">
                    <img
                      src={
                        recentChats[selectedCardIndex]?.data?.otherImage ||
                        ""
                      }
                      alt="User"
                      className="w-[59px] h-[59px] rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <h1 className="font-bold">
                        {recentChats[selectedCardIndex]?.data?.otherName}
                      </h1>
                      <p>{recentChats[selectedCardIndex]?.data?.time}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex border border-gray-400 rounded-full w-[37px] h-[37px] p-2 justify-center items-center">
                    <HiOutlineDotsVertical className="font-bold text-2xl" />
                  </div>
                </div>
              </button>

              <div className="">
                {recentChats && recentChats.length > 0 && selectedCardIndex !== null && (
                  <UsersChat
                    userImg={recentChats[selectedCardIndex]?.data?.otherImage}
                    username={recentChats[selectedCardIndex]?.data?.otherName}
                    time={recentChats[selectedCardIndex]?.data?.time}
                    usersCharMsgs={usersCharMsgs}
                    selectedCardIndex={selectedCardIndex}
                    recentChats={recentChats}
                    onSendMessage={handleSendMessage}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rightbar */}
      {showRightbar && (
        <div className="w-[26%] h-dvh">
          <Rightbar />
        </div>
      )}
    </div>
  );
};

export default ChatMain;
