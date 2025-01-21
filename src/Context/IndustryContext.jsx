// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// import React, { createContext, useEffect, useState } from 'react';
// import { db } from '../Services/Firebase';
// import { useAuth } from './AuthContext';

// export const IndustryData = createContext();

// const IndustryContext = ({ children }) => {
//     const [talentData, setTalentData] = useState([]);
//     const { currentUser } = useAuth();

//     const fetchUsers = async () => {
//         try {
//             if (!currentUser) {
//                 setTalentData([]);
//                 return;
//             }

//             // Fetch current user's document to get friends list
//             const currentUserDocRef = doc(db, "userCollection", currentUser.uid);
//             const currentUserDoc = await getDoc(currentUserDocRef);

//             let friendsList = [];
//             if (currentUserDoc.exists()) {
//                 const currentUserData = currentUserDoc.data();
//                 friendsList = currentUserData.friends || []; // Assuming 'friends' is an array of user IDs
//             }

//             // Fetch all users
//             const querySnapshot = await getDocs(collection(db, "userCollection"));
//             const allUsers = querySnapshot.docs
//                 .map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }))
//                 .filter(user => 
//                     user.id !== currentUser.uid && // Exclude current user
//                     !friendsList.includes(user.id) // Exclude friends
//                 );

//             setTalentData(allUsers);
//         } catch (error) {
//             console.log("Error in fetching users talent ", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [currentUser]); // Re-fetch when currentUser changes

//     return (
//         <IndustryData.Provider value={talentData}>
//             {children}
//         </IndustryData.Provider>
//     );
// };

// export default IndustryContext;
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// import React, { createContext, useEffect, useState } from 'react';
// import { db } from '../Services/Firebase';
// import { useAuth } from './AuthContext';

// export const IndustryData = createContext();

// const IndustryContext = ({ children }) => {
//     const [talentData, setTalentData] = useState([]);
//     const { currentUser } = useAuth();

//     const fetchUsers = async () => {
//         try {
//             // if (!currentUser) {
//             //     setTalentData([]);
//             //     return;
//             // }

//             // Fetch current user's document to get friends list
//             const currentUserDocRef = doc(db, "userCollection", currentUser?.uid);
//             const currentUserDoc = await getDoc(currentUserDocRef);

//             let friendsList = [];
//             if (currentUserDoc.exists()) {
//                 const currentUserData = currentUserDoc.data();
//                 friendsList = currentUserData.friends || []; // Assuming 'friends' is an array of user IDs
//             }

//             // Fetch all users
//             const querySnapshot = await getDocs(collection(db, "userCollection"));
//             const allUsers = querySnapshot.docs
//                 .map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }))
//                 .filter(user => 
//                     user.id !== currentUser.uid && // Exclude current user
//                     !friendsList.includes(user.id) // Exclude friends
//                 );

//             setTalentData(allUsers);
//         } catch (error) {
//             console.log("Error in fetching users talent ", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [currentUser]); // Re-fetch when currentUser changes

//     return (
//         <IndustryData.Provider value={talentData}>
//             {children}
//         </IndustryData.Provider>
//     );
// };

// export default IndustryContext;
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { db } from '../Services/Firebase';
import { useAuth } from './AuthContext';

export const IndustryData = createContext();

const IndustryContext = ({ children }) => {
    const [talentData, setTalentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            let allUsers = [];
            
            // Fetch all users from the collection
            const querySnapshot = await getDocs(collection(db, "userCollection"));
            
            if (currentUser) {
                // If user is logged in, fetch their friends list
                const currentUserDocRef = doc(db, "userCollection", currentUser.uid);
                const currentUserDoc = await getDoc(currentUserDocRef);
                
                let friendsList = [];
                if (currentUserDoc.exists()) {
                    const currentUserData = currentUserDoc.data();
                    friendsList = currentUserData.friends || [];
                }
                
                // Filter out current user and their friends
                allUsers = querySnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter(user => 
                        user.id !== currentUser.uid && 
                        !friendsList.includes(user.id)
                    );
            } else {
                // If no user is logged in, show all users without filtering
                allUsers = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            }

            setTalentData(allUsers);
        } catch (error) {
            console.error("Error in fetching users talent:", error);
            setTalentData([]); // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentUser]); // Re-fetch when currentUser changes

    return (
        <IndustryData.Provider value={{ talentData, isLoading, refreshData: fetchUsers }}>
            {children}
        </IndustryData.Provider>
    );
};

export default IndustryContext;