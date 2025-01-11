import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Load from '../Loader/Load';

const WishlistCasting = () => {
    const { callId } = useParams();
    const location = useLocation();
    
    // Extract the actual casting call ID from the path
    const actualCallId = location.pathname.split('/')[3];
    
    const [acceptedUsers, setAcceptedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAcceptedUsers = async () => {
            if (!actualCallId) return;
            
            setIsLoading(true);
            try {
                // Use actualCallId instead of callId
                const applicationsRef = collection(db, "castingCallCollection", actualCallId, "applicationCollection");
                const acceptedQuery = query(applicationsRef, where("isAccepted", "==", true));
                const acceptedSnap = await getDocs(acceptedQuery);
                
                const acceptedData = await Promise.all(acceptedSnap.docs.map(async (doc) => {
                    const application = { id: doc.id, ...doc.data() };
                    
                    // Get user data
                    const userQuery = query(
                        collection(db, "userCollection"), 
                        where("docID", "==", application.userID)
                    );
                    const userSnap = await getDocs(userQuery);
                    const userData = userSnap.docs[0]?.data() || {};
                    
                    // Get casting call data
                    const castingCallDoc = await getDoc(doc.ref.parent.parent);
                    const castingCallData = castingCallDoc.data() || {};

                    return {
                        ...application,
                        userData,
                        castingCallData
                    };
                }));

                console.log("Fetched accepted users:", acceptedData);
                setAcceptedUsers(acceptedData);
            } catch (error) {
                console.error("Error fetching accepted users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAcceptedUsers();
    }, [actualCallId]);

    if (isLoading) return <Load />;

    return (
        <div className='mb-20'>
            {acceptedUsers.length > 0 ? (
                acceptedUsers.map((data) => (
                    <ApplicantsCard
                        key={data.id}
                        {...data}
                        name={data.userData?.firstName || 'Unknown'}
                        age={data.castingCallData?.age}
                        height={data.castingCallData?.height}
                        gender={data.castingCallData?.gender}
                        experience={data.userData?.experience || 'N/A'}
                        image={data.userData?.image}
                        applied={data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'Unknown date'}
                        WishlistCasting={true}
                    />
                ))
            ) : (
                <p className='text-center font-bold mt-2'>No accepted applicants found.</p>
            )}
        </div>
    );
};

export default WishlistCasting;