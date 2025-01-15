// import React, { useState } from 'react'
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
// import '../CSS/Connections.css'
// import { ImSpinner2 } from 'react-icons/im'

// const Connections = ({ image, username, description, network, user, onAccept, onReject = { onReject }, reqData, rightBar }) => {
//   const [isAccepting, setIsAccepting] = useState(false);
//   const [isRejecting, setIsRejecting] = useState(false);
//   const handleAccept = async () => {
//     if (onAccept) {
//       setIsAccepting(true);
//       try {
//         await onAccept(user);
//       } catch (error) {
//         console.error('Error accepting connection:', error);
//       } finally {
//         setIsAccepting(false);
//       }
//     }
//   };

//   const handleReject = async () => {
//     if (onReject) {
//         setIsRejecting(true);
//         try {
//             await onReject(user); // Pass the user object to onReject
//         } catch (error) {
//             console.error('Error rejecting connection:', error);
//         } finally {
//             setIsRejecting(false);
//         }
//     }
// };


//   return (
//     <div className={`flex flex-col gap-4 ${network && 'px-4 w-[245px] max-h-auto bg-[#ECF5FE] gap-6 rounded-xl py-8'}`}>
//       {
//         network ? (
//           <div className='network ml-1 flex flex-col font-bold gap-2'>
//             <img src={image} alt="" className={`w-12 h-12 ${network && 'w-20 h-20'} rounded-full`} />
//             <div className=''>
//               <h1 className='text-sm font-semibold'>{username}</h1>
//               <p className='text-gray-400 text-xs'>{description}</p>
//             </div>
//           </div>
//         ) : rightBar && (
//           <div className='network ml-1 flex  font-bold gap-2'>
//             <img src={reqData?.image} alt="" className={`w-12 h-12 rounded-full`} />
//             <div className='flex flex-col justify-center items-start'>
//               <h1 className='text-lg font-semibold'>{username}</h1>
//               <p className='text-gray-400 text-sm'>{description}</p>
//             </div>
//           </div>
//         )
//       }
//       <div className={`flex ${network ? 'justify-start md:justify-center' : 'justify-center'} items-center md:gap-4 gap-2`}>
//         <button
//           onClick={handleAccept}
//           disabled={isAccepting || isRejecting}
//           className={`flex items-center gap-1 bg-[#B3FCE2] text-[#008F5C] py-2 px-3 rounded-3xl hover:bg-[#B3FCE2] ${(isAccepting || isRejecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {
//             isAccepting ? (
//               <div className='flex justify-center items-center gap-1'>
//                 <ImSpinner2 className='animate-spin' />
//                 Accepting
//               </div>
//             ) : (
//               <div className='flex justify-center items-center gap-1'>
//                 <AiOutlineCheck size={16} />
//                 Accept
//               </div>
//             )
//           }
//         </button>
//         <button
//           onClick={handleReject}
//           disabled={isAccepting || isRejecting}
//           className={`flex items-center gap-1 bg-[#FFE5E5] text-[#FF4E4E] py-2 px-3 rounded-3xl hover:bg-[#FFE5E5] ${(isAccepting || isRejecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {
//             isRejecting ? (
//               <div className='flex justify-center items-center gap-1'>
//                 <ImSpinner2 className='animate-spin' />
//                 Rejecting
//               </div>
//             ) : (
//               <div className='flex justify-center items-center gap-1'>
//                 <AiOutlineClose size={16} />
//                 Reject
//               </div>
//             )
//           }
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Connections
// Connections.jsx
import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im';
import { collection, doc, getDocs, query, updateDoc, where, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import { useAuth } from '../Context/AuthContext';

const Connections = ({ image, username, description, network, user, onAccept, setConnectionStatus }) => {
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const { currentUser } = useAuth();
    const dummyId = currentUser?.uid;
    const handleAccept = async () => {
        if (onAccept) {
            setIsAccepting(true);
            try {
                await onAccept(user);
            } catch (error) {
                console.error('Error accepting connection:', error);
            } finally {
                setIsAccepting(false);
            }
        }
    };

    const handleReject = async () => {
        console.log("Reject clicked for user:", user.docID);
        if (!user || !dummyId) return;

        try {
            setIsRejecting(true);
    
            // Query current user's document
            const currentUserQuery = query(
                collection(db, 'userCollection'),
                where("docID", "==", dummyId)
            );
            const currentUserSnapshot = await getDocs(currentUserQuery);
    
            if (currentUserSnapshot.empty) {
                console.error("Current user not found");
                return false;
            }
    
            const currentUserDoc = currentUserSnapshot.docs[0];
    
            // Query targeted user's document
            const targetedUserQuery = query(
                collection(db, 'userCollection'),
                where("docID", "==", user.docID)
            );
            const targetedUserSnapshot = await getDocs(targetedUserQuery);
    
            if (targetedUserSnapshot.empty) {
                console.error("Targeted user not found");
                return false;
            }
    
            const targetedUserDoc = targetedUserSnapshot.docs[0];
    
            // Get document references
            const currentUserRef = doc(db, 'userCollection', currentUserDoc.id);
            const targetedUserRef = doc(db, 'userCollection', targetedUserDoc.id);
    
            // Perform all updates in parallel
            await Promise.all([
                // Remove from current user's arrays
                updateDoc(currentUserRef, {
                    requested: arrayRemove(user.docID),
                    received: arrayRemove(user.docID)
                }),
                // Remove from targeted user's arrays
                updateDoc(targetedUserRef, {
                    received: arrayRemove(dummyId),
                    requested: arrayRemove(dummyId)
                })
            ]);
    
            // Verify the updates
            const [updatedCurrentUser, updatedTargetedUser] = await Promise.all([
                getDoc(currentUserRef),
                getDoc(targetedUserRef)
            ]);
    
            // Log the state of all relevant arrays after update
            console.log("After update - Current user:", {
                requested: updatedCurrentUser.data().requested || [],
                received: updatedCurrentUser.data().received || []
            });
            
            console.log("After update - Targeted user:", {
                requested: updatedTargetedUser.data().requested || [],
                received: updatedTargetedUser.data().received || []
            });
    
            // Update connection status in real-time
            if (setConnectionStatus) {
                setConnectionStatus(prev => ({
                    ...prev,
                    [user.docID]: 'Connect'
                }));
            }
    
            console.log("Connection request rejected successfully");
            return true;
        } catch (error) {
            console.error("Error handling rejection:", error);
            return false;
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <div className={`flex flex-col gap-4 ${network && 'px-4 w-[245px] max-h-auto bg-[#ECF5FE] gap-6 rounded-xl py-8'}`}>
            {network ? (
                <div className='network ml-1 flex flex-col font-bold gap-2'>
                    <img src={image} alt="" className={`w-12 h-12 ${network && 'w-20 h-20'} rounded-full`} />
                    <div className=''>
                        <h1 className='text-sm font-semibold'>{username}</h1>
                        <p className='text-gray-400 text-xs'>{description}</p>
                    </div>
                </div>
            ) : (
                <div className='network ml-1 flex font-bold gap-2'>
                    <img src={user?.image} alt="" className="w-12 h-12 rounded-full" />
                    <div className='flex flex-col justify-center items-start'>
                        <h1 className='text-lg font-semibold'>{username}</h1>
                        <p className='text-gray-400 text-sm'>{description}</p>
                    </div>
                </div>
            )}
            <div className={`flex ${network ? 'justify-start md:justify-center' : 'justify-center'} items-center md:gap-4 gap-2`}>
                <button
                    onClick={handleAccept}
                    disabled={isAccepting || isRejecting}
                    className={`flex items-center gap-1 bg-[#B3FCE2] text-[#008F5C] py-2 px-3 rounded-3xl hover:bg-[#B3FCE2] ${(isAccepting || isRejecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isAccepting ? (
                        <div className='flex justify-center items-center gap-1'>
                            <ImSpinner2 className='animate-spin' />
                            Accepting
                        </div>
                    ) : (
                        <div className='flex justify-center items-center gap-1'>
                            <AiOutlineCheck size={16} />
                            Accept
                        </div>
                    )}
                </button>
                <button
                    onClick={handleReject}
                    disabled={isAccepting || isRejecting}
                    className={`flex items-center gap-1 bg-[#FFE5E5] text-[#FF4E4E] py-2 px-3 rounded-3xl hover:bg-[#FFE5E5] ${(isAccepting || isRejecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isRejecting ? (
                        <div className='flex justify-center items-center gap-1'>
                            <ImSpinner2 className='animate-spin' />
                            Rejecting
                        </div>
                    ) : (
                        <div className='flex justify-center items-center gap-1'>
                            <AiOutlineClose size={16} />
                            Reject
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Connections;

