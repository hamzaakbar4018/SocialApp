// RejectedCasting.jsx
import React, { useEffect, useState, useCallback } from 'react';
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';
import { collection, getDocs, query, where, doc as firestoreDoc, getDoc } from 'firebase/firestore'; // Rename 'doc' to 'firestoreDoc'
import { db } from '../../Services/Firebase';
import Load from '../Loader/Load';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RejectedCasting = () => {
    const { callId } = useParams(); // Get callId from URL
    const [rejectedUsers, setRejectedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!callId) {
            console.error("Casting call ID is missing");
            return;
        }

        setIsLoading(true);
        try {
            // Fetch applications for this specific casting call where isRejected is true
            const applicationsQuery = query(
                collection(db, "castingCallCollection", callId, "applicationCollection"),
                where("isRejected", "==", true)
            );

            const applicationSnapshot = await getDocs(applicationsQuery);
            const applications = applicationSnapshot.docs.map((applicationDoc) => ({
                id: applicationDoc.id,
                ...applicationDoc.data(),
            }));

            // Fetch casting call data directly using callId
            const castingCallDocRef = firestoreDoc(db, "castingCallCollection", callId);
            const castingCallSnapshot = await getDoc(castingCallDocRef);
            const castingCallData = castingCallSnapshot.exists()
                ? { id: castingCallSnapshot.id, ...castingCallSnapshot.data() }
                : null;

            // Fetch additional user details
            const enrichedApplications = await Promise.all(
                applications.map(async (application) => {
                    try {
                        // Fetch user data
                        const userQuery = query(
                            collection(db, "userCollection"),
                            where("docID", "==", application.userID)
                        );
                        const userSnapshot = await getDocs(userQuery);
                        const userData = userSnapshot.docs.map((userDoc) => ({
                            id: userDoc.id,
                            ...userDoc.data(),
                        }))[0];

                        return {
                            ...application,
                            userData: userData || null,
                            castingCallData: castingCallData
                        };
                    } catch (enrichmentError) {
                        console.error("Error enriching application data:", enrichmentError);
                        return { ...application, castingCallData };
                    }
                })
            );

            setRejectedUsers(enrichedApplications);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching casting data:", error);
            toast.error("Failed to fetch rejected applicants.");
            setIsLoading(false);
        }
    }, [callId]);

    useEffect(() => {
        if (callId) {
            fetchData();
        }
    }, [callId, fetchData]);

    if (isLoading) return <Load />;
const rejected = true;
    return (
        <>
            <ToastContainer />
            <div className='mb-20'>
                {rejectedUsers.length > 0 ? (
                    rejectedUsers.map((data, index) => (
                        <ApplicantsCard
                            key={data.id || index}
                            {...data}
                            name={data.userData?.firstName || 'Unknown'}
                            age={data.castingCallData?.age}
                            height={data.castingCallData?.height}
                            gender={data.castingCallData?.gender}
                            experience={data.userData?.experience || 'N/A'}
                            image={data.userData?.image}
                            applied={`on ${data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'Unknown date'}`}
                            RejectedCasting={true}
                            castingCallData={data.castingCallData}
                            rejected={rejected}
                        />
                    ))
                ) : (
                    <p className='text-center font-bold mt-2'>No rejected applicants found.</p>
                )}
            </div>
        </>
    );
};

export default RejectedCasting;
