// // import React, { useContext, useEffect, useRef, useState } from 'react';
// // import searchi from '../../assets/Icons SVG/Search.svg'
// // import Notifications from '../../assets/Icons SVG/Notifications.svg'
// // import Rightbar from "../Rightbar";
// // import Arrow from '../../assets/Icons SVG/Arrow.svg'
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";
// // import "swiper/css/scrollbar";
// // import ProductionData from "../../Cards/Talent/ProductionData";
// // import IndustryPage from '../../Cards/Talent/IndustryPage';
// // import Sidebar from '../Sidebar.jsx'
// // import { FiMenu } from 'react-icons/fi';
// // import { NotificatinData } from '../../Context/NotificatinContext.jsx';
// // import { IndustryData } from '../../Context/IndustryContext.jsx';
// // import Loader from '../Loader/Loader.jsx';
// // import { db } from '../../Services/Firebase.jsx';
// // import { useAuth } from '../../Context/AuthContext.jsx';
// // import SearchBar from '../SearchBar.jsx';
// // import NoDataFound from '../Loader/NoData.jsx';
// // import { collection, doc, getDocs, query, updateDoc, where, arrayRemove } from 'firebase/firestore';


// // const TalentMain = () => {
// //     const talentData = useContext(IndustryData);
// //     const allusers = useContext(IndustryData);

// //     const productionData = allusers.filter(user => user.isProductionHouse === true);
// //     console.log("productionData", productionData)
// //     const { currentUser } = useAuth();
// //     const dummyId = currentUser.uid;
// //     console.log(dummyId, "Check")

// //     const usersWithDummyId = productionData.filter(user =>
// //         Array.isArray(user.follow) && user.follow.includes(dummyId)
// //     );




// //     const notifyData = useContext(NotificatinData);
// //     const [Loading, setLoading] = useState(false);
// //     const [popup, setpopup] = useState(false);
// //     const handlePopup = () => {
// //         setpopup(!popup)
// //     }
// //     const [showSidebar, setShowSidebar] = useState(false);
// //     const handleSidebarToggle = () => {
// //         setShowSidebar(!showSidebar);
// //     };
// //     const [showRightbar, setShowRightbar] = useState(false);
// //     const [search, setSearch] = useState(false);
// //     const searchRef = useRef(null);
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (searchRef.current && !searchRef.current.contains(event.target)) {
// //                 setSearch(false);
// //             }
// //         };

// //         document.addEventListener('mousedown', handleClickOutside);
// //         return () => {
// //             document.removeEventListener('mousedown', handleClickOutside);
// //         };
// //     }, [searchRef]);
// //     const handleBar = () => {
// //         setShowRightbar(!showRightbar);
// //     };

// //     const handleSearch = () => {
// //         console.log("Search button clicked");
// //         setSearch(!search);
// //     };

// //     const [connectionStatus, setConnectionStatus] = useState("Follow");

// //     const handleConnect = async (targetedUser, action = 'connect') => {
// //         try {
// //             setLoading(true);
// //             const currentUserQuery = query(
// //                 collection(db, 'userCollection'),
// //                 where("docID", "==", dummyId)
// //             );
// //             const currentUserSnapshot = await getDocs(currentUserQuery);

// //             if (currentUserSnapshot.empty) {
// //                 console.error("Current user not found");
// //                 return false;
// //             }

// //             const currentUserDoc = currentUserSnapshot.docs[0];

// //             const requesterQuery = query(
// //                 collection(db, 'userCollection'),
// //                 where("docID", "==", targetedUser.docID)
// //             );
// //             const requesterSnapshot = await getDocs(requesterQuery);

// //             if (requesterSnapshot.empty) {
// //                 console.error("Targeted user not found");
// //                 return false;
// //             }

// //             const connectorDoc = requesterSnapshot.docs[0];

// //             const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
// //             const requesterRef = doc(db, 'userCollection', connectorDoc.id);

// //             if (action === 'connect') {
// //                 // Check if already requested or connected
// //                 const currentRequested = currentUserDoc.data().requested || [];
// //                 if (currentRequested.includes(targetedUser.docID)) {
// //                     console.log("Already requested");
// //                     setConnectionStatus(prev => ({
// //                         ...prev,
// //                         [targetedUser.docID]: 'Requested'
// //                     }));
// //                     return 'Requested';
// //                 }

// //                 // Update current user's requested list
// //                 await updateDoc(currentUserRef, {
// //                     requested: [...currentRequested, targetedUser.docID],
// //                 });

// //                 // Update targeted user's received list
// //                 await updateDoc(requesterRef, {
// //                     received: [...(connectorDoc.data().received || []), dummyId]
// //                 });

// //                 // Update connection status in real-time
// //                 setConnectionStatus(prev => ({
// //                     ...prev,
// //                     [targetedUser.docID]: 'Requested'
// //                 }));

// //                 console.log("Connection request sent successfully");
// //                 return 'Requested';
// //             }

// //             return false;
// //         } catch (error) {
// //             console.error("Error handling connection request:", error);
// //             return false;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleFollow = async (targetedUser, action = 'follow') => {
// //         try {
// //             setConnectionStatus('Follow')
// //             setLoading(true);
// //             const currentUserQuery = query(
// //                 collection(db, 'userCollection'),
// //                 where("docID", "==", dummyId)
// //             );
// //             const currentUserSnapshot = await getDocs(currentUserQuery);

// //             if (currentUserSnapshot.empty) {
// //                 console.error("Current user not found");
// //                 return false;
// //             }

// //             const currentUserDoc = currentUserSnapshot.docs[0];
// //             const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);

// //             // Get current user's follow array or initialize if not exists
// //             const currentFollow = currentUserDoc.data().follow || [];

// //             // Check if already following
// //             if (currentFollow.includes(targetedUser.docID)) {
// //                 console.log("Already following");
// //                 setConnectionStatus("Following")
// //                 return 'Following';
// //             }

// //             // Update current user's follow list
// //             await updateDoc(currentUserRef, {
// //                 follow: [...currentFollow, targetedUser.docID]
// //             });

// //             // Update local state to reflect following status
// //             if (action === 'follow') {
// //                 setConnectionStatus(prev => ({
// //                     ...prev,
// //                     [targetedUser.docID]: 'Following'
// //                 }));
// //             }
// //             console.log("Followed successfully");
// //             return 'Following';
// //         } catch (error) {
// //             console.error("Error handling follow request:", error);
// //             return false;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleReject = async (targetedUser) => {
// //         try {
// //             setLoading(true);
// //             // Query current user's document
// //             const currentUserQuery = query(
// //                 collection(db, 'userCollection'),
// //                 where("docID", "==", dummyId)
// //             );
// //             const currentUserSnapshot = await getDocs(currentUserQuery);

// //             if (currentUserSnapshot.empty) {
// //                 console.error("Current user not found");
// //                 return false;
// //             }

// //             const currentUserDoc = currentUserSnapshot.docs[0];

// //             // Query targeted user's document
// //             const targetedUserQuery = query(
// //                 collection(db, 'userCollection'),
// //                 where("docID", "==", targetedUser.docID)
// //             );
// //             const targetedUserSnapshot = await getDocs(targetedUserQuery);

// //             if (targetedUserSnapshot.empty) {
// //                 console.error("Targeted user not found");
// //                 return false;
// //             }

// //             const targetedUserDoc = targetedUserSnapshot.docs[0];

// //             const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
// //             const targetedUserRef = doc(db, 'userCollection', targetedUserDoc.id);

// //             // Remove targetedUser.docID from current user's 'requested' array
// //             await updateDoc(currentUserRef, {
// //                 requested: arrayRemove(targetedUser.docID),
// //             });

// //             // Remove dummyId from targeted user's 'received' array
// //             await updateDoc(targetedUserRef, {
// //                 received: arrayRemove(dummyId),
// //             });

// //             // Update connection status in real-time
// //             setConnectionStatus(prev => ({
// //                 ...prev,
// //                 [targetedUser.docID]: 'Connect', // Reset to default state
// //             }));

// //             console.log("Connection request rejected successfully");
// //             return 'Rejected';
// //         } catch (error) {
// //             console.error("Error handling rejection:", error);
// //             return false;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };



// //     console.log(connectionStatus)

// //     return (
// //         <div className={`flex ${showRightbar ? "col-span-8" : "col-span-10"} transition-all`}>
// //             <div className="flex-grow w-full p-[2px] bg-gray-100">
// //                 <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
// //                     <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span> Talent</h1>
// //                     {showSidebar && (
// //                         <dialog id="my_modal_3" className="modal" open>
// //                             <div className="w-full h-full ">
// //                                 <form method="dialog">
// //                                     <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
// //                                 </form>
// //                                 <Sidebar />
// //                             </div>
// //                         </dialog>
// //                     )}
// //                     {search && (
// //                         <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
// //                     )}
// //                     <div className={`flex ${search && 'm-3'} justify-end gap-2 md:gap-5 items-center w-full z-10`}>
// //                         {/* <div
// //                             ref={searchRef}
// //                             className={`relative flex border-gray-300 border justify-end items-center md:bg-[#F5F5F5] rounded-3xl px-3 md:py-2 py-3 space-x-2 transition-all duration-300 ease-in-out ${search ? 'w-full rounded-xl bg-[#F5F5F5]' : 'md:w-[300px]'}`}
// //                         >
// //                             <img onClick={handleSearch} src={searchi} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer' alt="Search" />

// //                             <input
// //                                 onClick={handleSearch}
// //                                 type="search"
// //                                 placeholder='Search'
// //                                 className={`outline-none flex bg-transparent rounded px-2 py-1 w-full transition-all duration-300 ease-in-out ${search ? 'block' : 'hidden md:flex'}`}
// //                             />

// //                             {search && (
// //                                 <img src={Arrow} onClick={handleSearch} className='w-9 p-1 h-9 bg-black rounded-full cursor-pointer' />
// //                             )}

// //                             {search && (
// //                                 <div className='bg-white absolute md:right-2 right-0 top-full mt-3 w-full md:w-[98%] rounded-lg p-4'>
// //                                     <div className="recent flex items-center justify-between mx-1">
// //                                         <div>
// //                                             <h2 className='text-gray-400 text-sm'>Recent</h2>
// //                                         </div>
// //                                         <div>
// //                                             <button className='text-[#399AF3] text-sm'>Clear all</button>
// //                                         </div>
// //                                     </div>
// //                                     <div className="users flex justify-between items-center m-1">
// //                                         <h1>Hamza Akbar</h1>
// //                                         <h1 className='cursor-pointer'>✕</h1>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div> */}
// //                         <SearchBar search={search} setSearch={setSearch} />
// //                         <div
// //                             onClick={() => {
// //                                 if (window.innerWidth <= 640) {
// //                                     handlePopup();
// //                                 } else {
// //                                     handleBar();
// //                                 }
// //                             }}
// //                             className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}
// //                         >
// //                             <img src={Notifications} alt="Notifications" />
// //                         </div>
// //                         {
// //                             popup && (
// //                                 <div className='bg-black bg-opacity-50 inset-0 fixed top-0'>
// //                                     <dialog className="modal" open>
// //                                         <div className="bg-white h-screen w-full p-0">
// //                                             <button
// //                                                 className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
// //                                                 onClick={handlePopup}
// //                                             >
// //                                                 ✕
// //                                             </button>
// //                                             <div className="border-b mb-3 px-6 pt-6 border-gray-300">
// //                                                 <h3 className="font-bold mb-4 text-lg">Notifications</h3>
// //                                             </div>
// //                                             <div className="px-6 flex mb-2 flex-col justify-center gap-3">
// //                                                 {
// //                                                     notifyData.length > 0 ? (
// //                                                         notifyData.map((data, index) => (
// //                                                             <div className="flex items-center gap-2" key={index}>
// //                                                                 <img
// //                                                                     className="w-14 h-14 rounded-full"
// //                                                                     src={data.fromImage}
// //                                                                     alt="image"
// //                                                                 />
// //                                                                 <div className="flex flex-col justify-center">
// //                                                                     <h1 className="font-semibold">
// //                                                                         {data.fromName} <span className="font-light">{data.title}</span>
// //                                                                     </h1>
// //                                                                     <p className="text-[#9B9B9B] text-sm">
// //                                                                         {data.createdAt ? format(new Date(data.createdAt), 'MMM dd, yyyy, hh:mm a') : 'Date not available'}
// //                                                                     </p>
// //                                                                 </div>
// //                                                             </div>
// //                                                         ))
// //                                                     ) : (
// //                                                         <div className="text-center text-gray-400 text-sm">
// //                                                             No notifications available
// //                                                         </div>
// //                                                     )
// //                                                 }
// //                                             </div>
// //                                         </div>
// //                                     </dialog>
// //                                 </div>
// //                             )
// //                         }

// //                     </div>


// //                 </div>
// //                 <div className="p-[2px]">
// //                     <div className=" bg-white pl-1 flex-grow-0 py-4  space-y-2">
// //                         <h3 className="text-2xl md:px-0 md:pl-4 px-2">People in Drama Industry</h3>
// //                         {
// //                             talentData ? (
// //                                 talentData.length > 0 ? (
// //                                     <IndustryPage className=""
// //                                         onConnect={(user) => handleConnect(user, 'connect')}
// //                                         connectionStatus={connectionStatus}
// //                                         setConnectionStatus={setConnectionStatus}
// //                                         showRightbar={showRightbar}
// //                                         onReject={(user) => handleReject(user)}
// //                                     />
// //                                 ) : (
// //                                     <NoDataFound />
// //                                 )
// //                             ) : (
// //                                 <Loader />
// //                             )}

// //                     </div>
// //                     <div className=" bg-white flex-grow-0 pl-1 py-4 space-y-2">
// //                         <h3 className="text-2xl md:px-0 md:pl-4 px-2">Popular Production houses</h3>
// //                         {
// //                             productionData ? (
// //                                 productionData.length > 0 ? (
// //                                     <ProductionData
// //                                         onFollow={(user) => handleFollow(user, 'follow')}
// //                                         productionData={productionData}
// //                                         connectionStatus={connectionStatus}
// //                                         showRightbar={showRightbar}
// //                                     />
// //                                 ) : (
// //                                     <NoDataFound />
// //                                 )
// //                             ) : (
// //                                 <Loader />
// //                             )
// //                         }
// //                     </div>
// //                 </div>
// //             </div>

// //             {showRightbar && (
// //                 <div className="w-[26%]">
// //                     <Rightbar />
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default TalentMain;
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import searchi from '../../assets/Icons SVG/Search.svg';
// import Notifications from '../../assets/Icons SVG/Notifications.svg';
// import Rightbar from "../Rightbar";
// import Arrow from '../../assets/Icons SVG/Arrow.svg';
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import ProductionData from "../../Cards/Talent/ProductionData";
// import IndustryPage from '../../Cards/Talent/IndustryPage';
// import Sidebar from '../Sidebar.jsx';
// import { FiMenu } from 'react-icons/fi';
// import { NotificatinData } from '../../Context/NotificatinContext.jsx';
// import { IndustryData } from '../../Context/IndustryContext.jsx';
// import Loader from '../Loader/Loader.jsx';
// import { collection, doc, getDocs, query, updateDoc, where, arrayRemove, getDoc } from 'firebase/firestore'; // Import arrayRemove
// import { db } from '../../Services/Firebase.jsx';
// import { useAuth } from '../../Context/AuthContext.jsx';
// import SearchBar from '../SearchBar.jsx';
// import NoDataFound from '../Loader/NoData.jsx';
// import { onSnapshot } from 'firebase/firestore';

// const TalentMain = () => {
//     const talentData = useContext(IndustryData);
//     const allusers = useContext(IndustryData);

//     const productionData = allusers.filter(user => user.isProductionHouse === true);
//     console.log("productionData", productionData);
//     const { currentUser } = useAuth();
//     const dummyId = currentUser.uid;

//     const usersWithDummyId = productionData.filter(user =>
//         Array.isArray(user.follow) && user.follow.includes(dummyId)
//     );

//     const notifyData = useContext(NotificatinData);
//     const [Loading, setLoading] = useState(false);
//     const [popup, setpopup] = useState(false);
//     const handlePopup = () => {
//         setpopup(!popup);
//     };
//     const [showSidebar, setShowSidebar] = useState(false);
//     const handleSidebarToggle = () => {
//         setShowSidebar(!showSidebar);
//     };
//     const [showRightbar, setShowRightbar] = useState(false);
//     const [search, setSearch] = useState(false);
//     const searchRef = useRef(null);
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setSearch(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [searchRef]);
//     const handleBar = () => {
//         setShowRightbar(!showRightbar);
//     };

//     const handleSearch = () => {
//         console.log("Search button clicked");
//         setSearch(!search);
//     };

//     const [connectionStatus, setConnectionStatus] = useState({}); // Initialize as an object

//     // Existing handleConnect function...
//     const handleConnect = async (targetedUser, action = 'connect') => {
//         try {
//             setLoading(true);
//             const currentUserQuery = query(
//                 collection(db, 'userCollection'),
//                 where("docID", "==", dummyId)
//             );
//             const currentUserSnapshot = await getDocs(currentUserQuery);

//             if (currentUserSnapshot.empty) {
//                 console.error("Current user not found");
//                 return false;
//             }

//             const currentUserDoc = currentUserSnapshot.docs[0];

//             const requesterQuery = query(
//                 collection(db, 'userCollection'),
//                 where("docID", "==", targetedUser.docID)
//             );
//             const requesterSnapshot = await getDocs(requesterQuery);

//             if (requesterSnapshot.empty) {
//                 console.error("Targeted user not found");
//                 return false;
//             }

//             const connectorDoc = requesterSnapshot.docs[0];

//             const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
//             const requesterRef = doc(db, 'userCollection', connectorDoc.id);

//             if (action === 'connect') {
//                 // Check if already requested or connected
//                 const currentRequested = currentUserDoc.data().requested || [];
//                 if (currentRequested.includes(targetedUser.docID)) {
//                     console.log("Already requested");
//                     setConnectionStatus(prev => ({
//                         ...prev,
//                         [targetedUser.docID]: 'Requested'
//                     }));
//                     return 'Requested';
//                 }

//                 // Update current user's requested list
//                 await updateDoc(currentUserRef, {
//                     requested: [...currentRequested, targetedUser.docID],
//                 });

//                 // Update targeted user's received list
//                 await updateDoc(requesterRef, {
//                     received: [...(connectorDoc.data().received || []), dummyId]
//                 });

//                 // Update connection status in real-time
//                 setConnectionStatus(prev => ({
//                     ...prev,
//                     [targetedUser.docID]: 'Requested'
//                 }));

//                 console.log("Connection request sent successfully");
//                 return 'Requested';
//             }

//             return false;
//         } catch (error) {
//             console.error("Error handling connection request:", error);
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // New handleReject function
//     // const handleReject = async (targetedUser) => {
//     //     console.log("Reject clicked for user:", targetedUser.docID);
//     //     try {
//     //         setLoading(true);
    
//     //         // Query current user's document
//     //         const currentUserQuery = query(
//     //             collection(db, 'userCollection'),
//     //             where("docID", "==", dummyId)
//     //         );
//     //         const currentUserSnapshot = await getDocs(currentUserQuery);
    
//     //         if (currentUserSnapshot.empty) {
//     //             console.error("Current user not found");
//     //             return false;
//     //         }
    
//     //         const currentUserDoc = currentUserSnapshot.docs[0];
    
//     //         // Query targeted user's document
//     //         const targetedUserQuery = query(
//     //             collection(db, 'userCollection'),
//     //             where("docID", "==", targetedUser.docID)
//     //         );
//     //         const targetedUserSnapshot = await getDocs(targetedUserQuery);
    
//     //         if (targetedUserSnapshot.empty) {
//     //             console.error("Targeted user not found");
//     //             return false;
//     //         }
    
//     //         const targetedUserDoc = targetedUserSnapshot.docs[0];
    
//     //         // Get document references
//     //         const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
//     //         const targetedUserRef = doc(db, 'userCollection', targetedUserDoc.id);
    
//     //         // Perform all updates in parallel
//     //         await Promise.all([
//     //             // Remove from current user's arrays
//     //             updateDoc(currentUserRef, {
//     //                 requested: arrayRemove(targetedUser.docID),
//     //                 received: arrayRemove(targetedUser.docID) // Also remove from received if present
//     //             }),
//     //             // Remove from targeted user's arrays
//     //             updateDoc(targetedUserRef, {
//     //                 received: arrayRemove(dummyId),
//     //                 requested: arrayRemove(dummyId) // Also remove from requested array
//     //             })
//     //         ]);
    
//     //         // Verify the updates
//     //         const [updatedCurrentUser, updatedTargetedUser] = await Promise.all([
//     //             getDoc(currentUserRef),
//     //             getDoc(targetedUserRef)
//     //         ]);
    
//     //         // Log the state of all relevant arrays after update
//     //         console.log("After update - Current user:", {
//     //             requested: updatedCurrentUser.data().requested || [],
//     //             received: updatedCurrentUser.data().received || []
//     //         });
            
//     //         console.log("After update - Targeted user:", {
//     //             requested: updatedTargetedUser.data().requested || [],
//     //             received: updatedTargetedUser.data().received || []
//     //         });
    
//     //         // Update connection status in real-time
//     //         setConnectionStatus(prev => ({
//     //             ...prev,
//     //             [targetedUser.docID]: 'Connect'
//     //         }));
    
//     //         console.log("Connection request rejected successfully");
//     //         return 'Rejected';
//     //     } catch (error) {
//     //         console.error("Error handling rejection:", error);
//     //         return false;
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
    
    
    

//     // Listener to detect when the other user rejects
//     // useEffect(() => {
//     //     if (!currentUser || productionData.length === 0) return;

//     //     // Get all targeted user docIDs
//     //     const targetedDocIDs = productionData.map(user => user.docID);

//     //     // Firestore 'in' operator allows a maximum of 10 values
//     //     // If you have more than 10, you'll need to split the queries
//     //     const chunkSize = 10;
//     //     const chunks = [];

//     //     for (let i = 0; i < targetedDocIDs.length; i += chunkSize) {
//     //         chunks.push(targetedDocIDs.slice(i, i + chunkSize));
//     //     }

//     //     const unsubscribeFunctions = chunks.map(chunk => {
//     //         const q = query(
//     //             collection(db, 'userCollection'),
//     //             where("docID", "in", chunk)
//     //         );

//     //         return onSnapshot(q, (snapshot) => {
//     //             snapshot.forEach(docSnapshot => {
//     //                 const targetedUserDoc = docSnapshot.data();
//     //                 const targetedUserID = targetedUserDoc.docID;

//     //                 const isRejected = !Array.isArray(targetedUserDoc.received) || !targetedUserDoc.received.includes(dummyId);

//     //                 if (isRejected && connectionStatus[targetedUserID] === 'Requested') {
//     //                     // Remove targetedUserID from current user's 'requested' array
//     //                     const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
//     //                     updateDoc(currentUserRef, {
//     //                         requested: arrayRemove(targetedUserID),
//     //                     }).then(() => {
//     //                         setConnectionStatus(prev => ({
//     //                             ...prev,
//     //                             [targetedUserID]: 'Connect', // Reset to default state
//     //                         }));
//     //                         console.log(`Connection request to ${targetedUserID} has been rejected by the user.`);
//     //                     }).catch(error => {
//     //                         console.error("Error removing requested ID after rejection:", error);
//     //                     });
//     //                 }
//     //             });
//     //         }, (error) => {
//     //             console.error("Error listening to target users' received arrays:", error);
//     //         });
//     //     });

//     //     // Clean up listeners on unmount
//     //     return () => {
//     //         unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
//     //     };
//     // }, [productionData, currentUser, dummyId, connectionStatus]);
//     useEffect(() => {
//         if (!currentUser || productionData.length === 0) return;
    
//         // Query the current user's document to get their requested array
//         const currentUserQuery = query(
//             collection(db, 'userCollection'),
//             where("docID", "==", dummyId)
//         );
    
//         // Get all targeted user docIDs that the current user has requested
//         getDocs(currentUserQuery).then((snapshot) => {
//             if (!snapshot.empty) {
//                 const currentUserDoc = snapshot.docs[0];
//                 const requestedUsers = currentUserDoc.data().requested || [];
    
//                 // Listen for changes in the users that the current user has requested
//                 const unsubscribe = onSnapshot(
//                     query(
//                         collection(db, 'userCollection'),
//                         where("docID", "in", requestedUsers)
//                     ),
//                     (snapshot) => {
//                         snapshot.forEach((docSnapshot) => {
//                             const targetedUserDoc = docSnapshot.data();
//                             const targetedUserID = targetedUserDoc.docID;
    
//                             // Check if the current user's ID is not in the received array
//                             // This means the request was rejected
//                             if (!targetedUserDoc.received?.includes(dummyId)) {
//                                 // Update the current user's document to remove the rejected request
//                                 const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
//                                 updateDoc(currentUserRef, {
//                                     requested: arrayRemove(targetedUserID)
//                                 }).then(() => {
//                                     // Update local state
//                                     setConnectionStatus(prev => ({
//                                         ...prev,
//                                         [targetedUserID]: 'Connect'
//                                     }));
//                                     console.log(`Request to ${targetedUserID} was rejected - removed from requested array`);
//                                 }).catch((error) => {
//                                     console.error("Error updating requested array:", error);
//                                 });
//                             }
//                         });
//                     },
//                     (error) => {
//                         console.error("Error listening to changes:", error);
//                     }
//                 );
    
//                 return () => unsubscribe();
//             }
//         }).catch((error) => {
//             console.error("Error querying current user:", error);
//         });
//     }, [currentUser, dummyId, productionData]);

//     console.log(connectionStatus);

//     return (
//         <div className={`flex ${showRightbar ? "col-span-8" : "col-span-10"} transition-all`}>
//             <div className="flex-grow w-full p-[2px] bg-gray-100">
//                 <div className='flex px-0 bg-white justify-between items-center border-b py-4'>
//                     <h1 onClick={handleSidebarToggle} className={`${search ? 'hidden' : 'text-xl text-nowrap font-bold items-center p-3 flex gap-2'}`}> <span className='md:hidden block'><FiMenu className='text-3xl' /></span> Talent</h1>
//                     {showSidebar && (
//                         <dialog id="my_modal_3" className="modal" open>
//                             <div className="w-full h-full ">
//                                 <form method="dialog">
//                                     <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 border-gray-300">✕</button>
//                                 </form>
//                                 <Sidebar />
//                             </div>
//                         </dialog>
//                     )}
//                     {search && (
//                         <div className='fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
//                     )}
//                     <div className={`flex ${search && 'm-3'} justify-end gap-2 md:gap-5 items-center w-full z-10`}>
//                         <SearchBar search={search} setSearch={setSearch} />
//                         <div
//                             onClick={() => {
//                                 if (window.innerWidth <= 640) {
//                                     handlePopup();
//                                 } else {
//                                     handleBar();
//                                 }
//                             }}
//                             className={`${search ? 'hidden' : 'rounded-full cursor-pointer p-3 mr-4 border border-gray-300'}`}
//                         >
//                             <img src={Notifications} alt="Notifications" />
//                         </div>
//                         {
//                             popup && (
//                                 <div className='bg-black bg-opacity-50 inset-0 fixed top-0'>
//                                     <dialog className="modal" open>
//                                         <div className="bg-white h-screen w-full p-0">
//                                             <button
//                                                 className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 border border-gray-300"
//                                                 onClick={handlePopup}
//                                             >
//                                                 ✕
//                                             </button>
//                                             <div className="border-b mb-3 px-6 pt-6 border-gray-300">
//                                                 <h3 className="font-bold mb-4 text-lg">Notifications</h3>
//                                             </div>
//                                             <div className="px-6 flex mb-2 flex-col justify-center gap-3">
//                                                 {
//                                                     notifyData.length > 0 ? (
//                                                         notifyData.map((data, index) => (
//                                                             <div className="flex items-center gap-2" key={index}>
//                                                                 <img
//                                                                     className="w-14 h-14 rounded-full"
//                                                                     src={data.fromImage}
//                                                                     alt="image"
//                                                                 />
//                                                                 <div className="flex flex-col justify-center">
//                                                                     <h1 className="font-semibold">
//                                                                         {data.fromName} <span className="font-light">{data.title}</span>
//                                                                     </h1>
//                                                                     <p className="text-[#9B9B9B] text-sm">
//                                                                         {data.createdAt ? format(new Date(data.createdAt), 'MMM dd, yyyy, hh:mm a') : 'Date not available'}
//                                                                     </p>
//                                                                 </div>
//                                                             </div>
//                                                         ))
//                                                     ) : (
//                                                         <div className="text-center text-gray-400 text-sm">
//                                                             No notifications available
//                                                         </div>
//                                                     )
//                                                 }
//                                             </div>
//                                         </div>
//                                     </dialog>
//                                 </div>
//                             )
//                         }

//                     </div>
//                 </div>
//                 <div className="p-[2px]">
//                     <div className=" bg-white pl-1 flex-grow-0 py-4  space-y-2">
//                         <h3 className="text-2xl md:px-0 md:pl-4 px-2">People in Drama Industry</h3>
//                         {
//                             talentData ? (
//                                 talentData.length > 0 ? (
//                                     <IndustryPage
//                                         className=""
//                                         onConnect={(user) => handleConnect(user, 'connect')}
//                                         connectionStatus={connectionStatus}
//                                         setConnectionStatus={setConnectionStatus}
//                                         showRightbar={showRightbar}
//                                     />
//                                 ) : (
//                                     <NoDataFound />
//                                 )
//                             ) : (
//                                 <Loader />
//                             )}
//                     </div>
//                     <div className=" bg-white flex-grow-0 pl-1 py-4 space-y-2">
//                         <h3 className="text-2xl md:px-0 md:pl-4 px-2">Popular Production houses</h3>
//                         {
//                             productionData ? (
//                                 productionData.length > 0 ? (
//                                     <ProductionData
//                                         onFollow={(user) => handleFollow(user, 'follow')}
//                                         productionData={productionData}
//                                         connectionStatus={connectionStatus}
//                                         showRightbar={showRightbar}
//                                     />
//                                 ) : (
//                                     <NoDataFound />
//                                 )
//                             ) : (
//                                 <Loader />
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>

//             {showRightbar && (
//                 <div className="w-[26%]">
//                     <Rightbar />
//                 </div>
//             )}
//         </div>
//     );

// };

// export default TalentMain;
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
    arrayRemove,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { FiMenu } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Components
import Rightbar from "../Rightbar";
import ProductionData from "../../Cards/Talent/ProductionData";
import IndustryPage from "../../Cards/Talent/IndustryPage";
import Sidebar from "../Sidebar.jsx";
import Loader from "../Loader/Loader.jsx";
import SearchBar from "../SearchBar.jsx";
import NoDataFound from "../Loader/NoData.jsx";

// Context
import { NotificatinData } from "../../Context/NotificatinContext.jsx";
import { IndustryData } from "../../Context/IndustryContext.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

// Firebase
import { db } from "../../Services/Firebase.jsx";

// Assets
import searchi from "../../assets/Icons SVG/Search.svg";
import Notifications from "../../assets/Icons SVG/Notifications.svg";

const TalentMain = () => {
    // Context
    const { talentData, isLoading } = useContext(IndustryData);
    const notifyData = useContext(NotificatinData);
    const { currentUser } = useAuth();

    // State
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showRightbar, setShowRightbar] = useState(false);
    const [search, setSearch] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState({});

    // Refs
    const searchRef = useRef(null);

    // Filter production houses
    const productionData =
        talentData?.filter((user) => user.isProductionHouse === true) || [];

    // Filter followed users if logged in
    const usersWithDummyId = currentUser
        ? productionData.filter(
            (user) =>
                Array.isArray(user.follow) && user.follow.includes(currentUser.uid)
        )
        : [];

    // Handlers
    const handlePopup = () => setPopup(!popup);
    const handleSidebarToggle = () => setShowSidebar(!showSidebar);
    const handleBar = () => setShowRightbar(!showRightbar);
    const handleSearch = () => setSearch(!search);

    // Handle connection requests
    const handleConnect = async (targetedUser, action = "connect") => {
        if (!currentUser) {
            window.location.href = "/login";
            return false;
        }

        try {
            setLoading(true);

            // Get current user's document
            const currentUserQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", currentUser.uid)
            );
            const currentUserSnapshot = await getDocs(currentUserQuery);

            if (currentUserSnapshot.empty) {
                console.error("Current user not found");
                return false;
            }

            const currentUserDoc = currentUserSnapshot.docs[0];

            // Get targeted user's document
            const requesterQuery = query(
                collection(db, "userCollection"),
                where("docID", "==", targetedUser.docID)
            );
            const requesterSnapshot = await getDocs(requesterQuery);

            if (requesterSnapshot.empty) {
                console.error("Targeted user not found");
                return false;
            }

            const connectorDoc = requesterSnapshot.docs[0];

            const currentUserRef = doc(db, "userCollection", currentUserDoc.id);
            const requesterRef = doc(db, "userCollection", connectorDoc.id);

            if (action === "connect") {
                // Check if already requested
                const currentRequested = currentUserDoc.data().requested || [];
                if (currentRequested.includes(targetedUser.docID)) {
                    setConnectionStatus((prev) => ({
                        ...prev,
                        [targetedUser.docID]: "Requested",
                    }));
                    return "Requested";
                }

                // Update current user's requested list
                await updateDoc(currentUserRef, {
                    requested: [...currentRequested, targetedUser.docID],
                });

                // Update targeted user's received list
                await updateDoc(requesterRef, {
                    received: [
                        ...(connectorDoc.data().received || []),
                        currentUser.uid,
                    ],
                });

                setConnectionStatus((prev) => ({
                    ...prev,
                    [targetedUser.docID]: "Requested",
                }));

                return "Requested";
            }

            return false;
        } catch (error) {
            console.error("Error handling connection request:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Handle click outside search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [searchRef]);

    return (
        <div
            className={`flex ${showRightbar ? "col-span-8" : "col-span-10"
                } transition-all`}
        >
            <div className="flex-grow w-full p-[2px] bg-gray-100">
                {/* Header */}
                <div className="flex px-0 bg-white justify-between items-center border-b py-4">
                    <h1
                        onClick={handleSidebarToggle}
                        className={`${search ? "hidden" : "text-xl text-nowrap font-bold items-center p-3 flex gap-2"
                            }`}
                    >
                        <span className="md:hidden block">
                            <FiMenu className="text-3xl" />
                        </span>{" "}
                        Talent
                    </h1>

                    {/* Search and Notifications */}
                    <div
                        className={`flex ${search && "m-3"
                            } justify-end gap-2 md:gap-5 items-center w-full z-10`}
                    >
                        <SearchBar search={search} setSearch={setSearch} />
                        <div
                            onClick={() =>
                                window.innerWidth <= 640 ? handlePopup() : handleBar()
                            }
                            className={`${search
                                    ? "hidden"
                                    : "rounded-full cursor-pointer p-3 mr-4 border border-gray-300"
                                }`}
                        >
                            <img src={Notifications} alt="Notifications" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-[2px]">
                    {/* Drama Industry Section */}
                    <div className="bg-white pl-1 flex-grow-0 py-4 space-y-2">
                        <h3 className="text-2xl md:px-0 md:pl-4 px-2">
                            People in Drama Industry
                        </h3>
                        {isLoading ? (
                            <Loader />
                        ) : talentData?.length > 0 ? (
                            <IndustryPage
                                onConnect={(user) =>
                                    currentUser && handleConnect(user, "connect")
                                }
                                connectionStatus={connectionStatus}
                                setConnectionStatus={setConnectionStatus}
                                showRightbar={showRightbar}
                                isLoggedIn={!!currentUser}
                            />
                        ) : (
                            <NoDataFound />
                        )}
                    </div>

                    {/* Production Houses Section */}
                    <div className="bg-white flex-grow-0 pl-1 py-4 space-y-2">
                        <h3 className="text-2xl md:px-0 md:pl-4 px-2">
                            Popular Production Houses
                        </h3>
                        {isLoading ? (
                            <Loader />
                        ) : productionData?.length > 0 ? (
                            <ProductionData
                                onFollow={(user) =>
                                    currentUser && handleConnect(user, "follow")
                                }
                                productionData={productionData}
                                connectionStatus={connectionStatus}
                                showRightbar={showRightbar}
                                isLoggedIn={!!currentUser}
                            />
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar and Modal Components */}
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
                <div className="fixed inset-0 top-0 w-full h-full bg-black opacity-50 z-10"></div>
            )}

            {popup && (
                <dialog className="modal" open>
                    <div className="bg-white h-screen w-full p-0">
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
                            {notifyData.length > 0 ? (
                                notifyData.map((data, index) => (
                                    <div className="flex items-center gap-2" key={index}>
                                        <img
                                            className="w-14 h-14 rounded-full"
                                            src={data.fromImage}
                                            alt="image"
                                        />
                                        <div className="flex flex-col justify-center">
                                            <h1 className="font-semibold">
                                                {data.fromName}{" "}
                                                <span className="font-light">{data.title}</span>
                                            </h1>
                                            <p className="text-[#9B9B9B] text-sm">
                                                {data.createdAt
                                                    ? new Date(data.createdAt).toLocaleString()
                                                    : "Date not available"}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-400 text-sm">
                                    No notifications available
                                </div>
                            )}
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default TalentMain;
