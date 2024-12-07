// import React from 'react'
// import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';

// const WishlistCasting = () => {
//     const dummyDataArray = [
//         {
//             name: "John Doe",
//             applied: "2 Days Ago",
//             age: 25,
//             height: "6.0 Feet",
//             gender: "Male",
//             experience: "3 Years",
//             image: "https://randomuser.me/api/portraits/men/1.jpg"
//         },
//         {
//             name: "Jane Smith",
//             applied: "5 Days Ago",
//             age: 28,
//             height: "5.6 Feet",
//             gender: "Female",
//             experience: "4 Years",
//             image: "https://randomuser.me/api/portraits/women/1.jpg"
//         },
//         {
//             name: "Michael Johnson",
//             applied: "1 Week Ago",
//             age: 30,
//             height: "5.9 Feet",
//             gender: "Male",
//             experience: "6 Years",
//             image: "https://randomuser.me/api/portraits/men/2.jpg"
//         },
//         {
//             name: "Emily Davis",
//             applied: "3 Days Ago",
//             age: 26,
//             height: "5.4 Feet",
//             gender: "Female",
//             experience: "2 Years",
//             image: "https://randomuser.me/api/portraits/women/2.jpg"
//         },
//         {
//             name: "Daniel Wilson",
//             applied: "4 Days Ago",
//             age: 29,
//             height: "5.8 Feet",
//             gender: "Male",
//             experience: "5 Years",
//             image: "https://randomuser.me/api/portraits/men/3.jpg"
//         }
//     ];
//     const isWishlistCasting = true;
//     return (
//             <div className='mb-20'>
//                 {
//                     dummyDataArray.map((data, index) => (
//                         <ApplicantsCard {...data} WishlistCasting={isWishlistCasting} />
//                     ))
//                 }
//             </div>
//     )
// }

// export default WishlistCasting

import { useContext, useEffect, useState, useCallback } from 'react';
import { ApplicationData } from '../../Context/ApplicationContext';
import ApplicantsCard from '../../Cards/CastingCards/ApplicantsCard';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../Services/Firebase';
import Load from '../Loader/Load';

const WishlistCasting = () => {
    const { applicationCollection, myCallID } = useContext(ApplicationData);
    const [receivedUser, setReceivedUser] = useState([]);
    const isWishlistCasting = true;
    // const [castingData, setcastingData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const rejected = true;
    const fetchData = useCallback(async () => {
        if (!myCallID) {
            console.error("Casting call ID is missing");
            return;
        }

        setIsLoading(true);
        try {
            // Fetch applications for this specific casting call where isAccepted is false
            const applicationsQuery = query(
                collection(db, "castingCallCollection", myCallID, "applicationCollection"),
                where("isPending", "==", true)
            );

            const applicationSnapshot = await getDocs(applicationsQuery);
            const applications = applicationSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Fetched Applications:", applications);

            // Fetch casting call data directly using myCallID
            const castingCallDocRef = doc(db, "castingCallCollection", myCallID);
            const castingCallSnapshot = await getDoc(castingCallDocRef);
            const castingCallData = castingCallSnapshot.exists()
                ? { id: castingCallSnapshot.id, ...castingCallSnapshot.data() }
                : null;

            console.log("Casting Call Data:", castingCallData);

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

            console.log("Enriched Applications:", enrichedApplications);
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
                            age={data?.castingCallData.age}
                            height={data?.castingCallData.height}
                            gender={data?.castingCallData.gender}
                            experience={data.userData?.experience || 'N/A'}
                            image={data.userData?.image}
                            received={true}
                            WishlistCasting={data.isPending || true}
                            castingCallData={data.castingCallData}
                        />
                    ))
                ) : (
                    <p className='text-center font-bold mt-2'>No applicants found for this casting call.</p>
                )}
            </div>
        )
    );
};

export default WishlistCasting;