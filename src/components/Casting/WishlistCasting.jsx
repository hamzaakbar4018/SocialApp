import { useContext, useEffect, useState, useCallback } from 'react';
import { ApplicationData } from '../../Context/ApplicationContext';
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Load from '../Loader/Load';

const WishlistCasting = () => {
    const { applicationCollection, myCallID } = useContext(ApplicationData);
    const [receivedUser, setReceivedUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!myCallID) {
            console.error("Casting call ID is missing");
            return;
        }

        setIsLoading(true);
        try {
            // Fetch applications for this specific casting call where isAccepted is true
            const applicationsQuery = query(
                collection(db, "castingCallCollection", myCallID, "applicationCollection"),
                where("isAccepted", "==", true)
            );

            const applicationSnapshot = await getDocs(applicationsQuery);
            const applications = applicationSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Fetch casting call data directly using myCallID
            const castingCallDocRef = doc(db, "castingCallCollection", myCallID);
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
                        const userData = userSnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
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

            setReceivedUser(enrichedApplications);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching casting data:", error);
            setIsLoading(false);
        }
    }, [myCallID]);

    useEffect(() => {
        if (myCallID) {
            fetchData();
        }
    }, [myCallID, fetchData]);

    return (
        isLoading ? (
            <Load />
        ) : (
            <div className='mb-20'>
                {receivedUser.length > 0 ? (
                    receivedUser.map((data, index) => (
                        <ApplicantsCard
                            key={data.id || index}
                            {...data}
                            name={data.userData?.firstName || 'Unknown'}
                            age={data?.castingCallData?.age}
                            height={data?.castingCallData?.height}
                            gender={data?.castingCallData?.gender}
                            experience={data.userData?.experience || 'N/A'}
                            image={data.userData?.image}
                            applied={`on ${new Date(data.createdAt?.toDate()).toLocaleDateString('en-US', { weekday: 'long' })}`}
                            WishlistCasting={true}
                            castingCallData={data.castingCallData}
                        />
                    ))
                ) : (
                    <p className='text-center font-bold mt-2'>No Accepted applicants found for this casting call.</p>
                )}
            </div>
        )
    );
};

export default WishlistCasting;