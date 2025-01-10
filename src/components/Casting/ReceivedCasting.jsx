import { useContext, useEffect, useState, useCallback } from 'react';
import { ApplicationData } from '../../Context/ApplicationContext';
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Load from '../Loader/Load';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReceivedCasting = () => {
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
            const applicationsQuery = query(
                collection(db, "castingCallCollection", myCallID, "applicationCollection"),
                where("isPending", "==", true)
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

            const enrichedApplications = await Promise.all(
                applications.map(async (application) => {
                    try {
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
            console.log("Received Applicants", enrichedApplications)
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching casting data:", error);
            setIsLoading(false);
        }
    }, [myCallID]);
    console.log(receivedUser)
    const handleStatusUpdate = (applicationId, status) => {
        setReceivedUser(prevUsers =>
            prevUsers.filter(user => user.id !== applicationId)
        );
    };

    useEffect(() => {
        if (myCallID) {
            fetchData();
        }
    }, [myCallID, fetchData]);

    return (
        <>
            <ToastContainer />
            {isLoading ? (
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
                                castingCallData={data.castingCallData}
                                onStatusUpdate={handleStatusUpdate}
                            />
                        ))
                    ) : (
                        <p className='text-center font-bold mt-2'>No pending applicants found for this casting call.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default ReceivedCasting;