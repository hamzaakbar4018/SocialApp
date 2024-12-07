import { useContext, useEffect, useState, useCallback } from 'react';
import { ApplicationData } from '../../Context/ApplicationContext';
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Load from '../Loader/Load';

const ReceivedCasting = () => {
    const { applicationCollection, myCallID } = useContext(ApplicationData);
    const [receivedUser, setReceivedUser] = useState([]);
    const [isLoading, setisLoading] = useState();

    const fetchData = useCallback(async () => {
        if (!myCallID) {
            console.error("Casting call ID is missing");
            return;
        }

        setisLoading(true);
        try {
            // Fetch applications for this specific casting call where isAccepted is false
            const applicationsQuery = query(
                collection(db, "castingCallCollection", myCallID, "applicationCollection"),
                where("isAccepted", "==", false)
            );

            const applicationSnapshot = await getDocs(applicationsQuery);
            const applications = applicationSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setisLoading(false);


            console.log("Fetched Applications:", applications);

            // Fetch additional user and casting call details
            const enrichedApplications = await Promise.all(
                applications.map(async (application) => {
                    try {
                        setisLoading(true);

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

                        // Fetch casting call data
                        const castingCallQuery = query(
                            collection(db, "castingCallCollection"),
                            where("castingCallID", "==", myCallID)
                        );
                        const castingCallSnapshot = await getDocs(castingCallQuery);
                        setisLoading(false);

                        const castingCallData = castingCallSnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))[0];

                        return {
                            ...application,
                            userData: userData || null,
                            castingCallData: castingCallData || null
                        };
                    } catch (enrichmentError) {
                        console.error("Error enriching application data:", enrichmentError);
                        return application;
                    }
                })
            );

            console.log("Enriched Applications:", enrichedApplications);
            setReceivedUser(enrichedApplications);

        } catch (error) {
            console.error("Error fetching casting data:", error);
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
                            age={data.userData?.age}
                            height={data.userData?.height}
                            gender={data.userData?.gender}
                            experience={data.userData?.experience}
                            image={data.userData?.image}
                            rejected={data.isRejected || false}
                            received={true}
                        />
                    ))
                ) : (
                    <p className='text-center font-bold mt-2'>No pending applicants found for this casting call.</p>
                )}
            </div>
        )
    );
};

export default ReceivedCasting;