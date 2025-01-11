import React, { useContext, useState } from 'react'
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import { ApplicationData } from '../../Context/ApplicationContext';
import { ImSpinner2 } from 'react-icons/im';

const ApplicantsCard = ({ 
    id,
    name, 
    applied, 
    age, 
    height, 
    gender, 
    experience, 
    image, 
    rejected, 
    WishlistCasting,
    castingCallData,
    onStatusUpdate,
    userID,
    fetchData
}) => {
    const { myCallID } = useContext(ApplicationData);
    const [isLoading, setIsLoading] = useState({
        accept: false,
        reject: false
    });

    const handleAccept = async () => {
        // Start loading for accept
        setIsLoading(prev => ({ ...prev, accept: true }));

        try {
            if (!castingCallData || !castingCallData.id) {
                throw new Error("Casting Call Data is missing");
            }

            const castingCallId = castingCallData.id;
            const applicationId = id;

            // Reference to the specific application document
            const applicationRef = doc(
                db,
                "castingCallCollection",
                castingCallId,
                "applicationCollection",
                applicationId
            );

            // Update the document to mark as accepted
            await updateDoc(applicationRef, {
                isAccepted: true,
                isPending: false,
                isRejected: false
            });

            // Call the parent component's update method
            if (onStatusUpdate) {
                onStatusUpdate(applicationId, 'accepted');
            }

            // Show success toast
            toast.success('Application Accepted Successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });

            fetchData();

        } catch (error) {
            console.error("Detailed Accept Error:", error);
            toast.error(`Failed to accept application: ${error.message}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            // Stop loading for accept
            setIsLoading(prev => ({ ...prev, accept: false }));
        }
    };


    const handleReject = async () => {
        setIsLoading(prev => ({ ...prev, reject: true }));
    
        try {
            if (!castingCallData || !castingCallData.id) {
                throw new Error("Casting Call Data is missing");
            }

            if (!userID) {
                throw new Error("User ID is missing");
            }
    
            const castingCallId = castingCallData.id;
            const applicationId = id;
    
            // Reference to the specific application document
            const applicationRef = doc(
                db,
                "castingCallCollection",
                castingCallId,
                "applicationCollection",
                applicationId
            );
    
            // Reference to the casting call document
            const castingCallRef = doc(db, "castingCallCollection", castingCallId);
            
    
            // Perform all operations in parallel
            await Promise.all([
                // Delete the application document
                // deleteDoc(applicationRef),

                updateDoc(applicationRef, {
                    isRejected: true,
                    isPending: false,
                    isAccepted: false
                }),
                
                // Remove the user ID from appliedUsers array using the dynamic userID
                updateDoc(castingCallRef, {
                    appliedUsers: arrayRemove(userID)
                })
                
            ]);

            // Call the parent component's update method
            if (onStatusUpdate) {
                onStatusUpdate(applicationId, 'rejected');
            }
    
            toast.success('Application Rejected Successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });

            fetchData();
    
        } catch (error) {
            console.error("Detailed Reject Error:", {
                message: error.message,
                code: error.code,
                stack: error.stack
            });
            
            toast.error(`Failed to reject application: ${error.message}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setIsLoading(prev => ({ ...prev, reject: false }));
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='border-b border-gray-300'>
                <div className='p-4'>
                    <div className='flex justify-between items-center '>
                        <div className='flex items-center gap-2'>
                            <img src={image} className='w-16 h-16 rounded-full' alt="" />
                            <div>
                                <h1 className='font-semibold text-lg'>{name}</h1>
                                <p className='text-[#676767] text-lg'>{applied}</p>
                            </div>
                        </div>
                    </div>
                    <div className='ml-10 mt-2 items-center'>
                        <div className='flex gap-6 items-center'>
                            <div>
                                <h2 className='text-[#9B9B9B] segoe text-sm font-semibold'>Age</h2>
                                <h1 className='font-bold text-lg '>{age}</h1>
                            </div>
                            <div>
                                <h2 className='text-[#9B9B9B] segoe segoe text-sm font-semibold'>Height</h2>
                                <h1 className='font-bold text-lg '>{height}</h1>
                            </div>
                            <div>
                                <h2 className='text-[#9B9B9B] segoe text-sm font-semibold'>Gender</h2>
                                <h1 className='font-bold text-lg '>{gender}</h1>
                            </div>
                            <div>
                                <h2 className='text-[#9B9B9B] segoe text-sm font-semibold'>Experience</h2>
                                <h1 className='font-bold text-lg '>{experience}</h1>
                            </div>
                        </div>
                    </div>
                    {
                        rejected ? (
                            <div className='mt-5 ml-10'>
                                <h1 className='text-[#FF0000] text-lg'>Rejected {applied}</h1>
                            </div>
                        ) : WishlistCasting ? (
                            <div className='mt-5 ml-10'>
                                <h1 className='text-[#008F5C] text-lg'>Accepted {applied}</h1>
                            </div>
                        ) : (
                            <div className='flex mt-5 ml-10 items-center'>
                                <div className='flex gap-2 '>
                                    <button
                                        onClick={handleAccept}
                                        disabled={isLoading.accept}
                                        className={`px-3 flex items-center rounded-3xl text-[#008F5C] bg-[#B3FCE2] py-2 ${isLoading.accept ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading.accept ? (
                                            <><ImSpinner2 className='text-2xl animate-spin mr-1' /> Processing</>
                                        ) : (
                                            <><TiTick className='text-2xl' /><span>Accept</span></>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        disabled={isLoading.reject}
                                        className={`px-3 flex items-center rounded-3xl text-[#FF0000] bg-[#FFE5E5] py-2 ${isLoading.reject ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading.reject ? (
                                            <><ImSpinner2 className='text-2xl animate-spin mr-1' /> Processing</>
                                        ) : (
                                            <><RxCross2 className='text-2xl' /><span>Reject</span></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ApplicantsCard;