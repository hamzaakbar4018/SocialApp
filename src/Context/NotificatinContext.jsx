// import React, { createContext, useEffect, useState } from 'react'
// import { getDocs, collection, query, where } from 'firebase/firestore';
// import { db } from '../Services/Firebase.jsx'
// import { useAuth } from './AuthContext.jsx';

// export const NotificatinData = createContext();

// const NotificatinContext = ({ children }) => {
//     const { currentUser, loading: authLoading } = useAuth();
//     const [notifyData, setNotifyData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchNotification = async () => {
//         if (!currentUser) {
//             setNotifyData([]);
//             setLoading(false);
//             return;
//         }

//         try {
//             const notifyQuery = query(
//                 collection(db, 'notificationCollection'),
//                 where("toID", '==', currentUser.uid)
//             );
            
//             const querySnapShot = await getDocs(notifyQuery);
//             const data = querySnapShot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
            
//             setNotifyData(data);
//             console.log(data)
//         } catch (error) {
//             console.error("Error in fetching notifications:", error);
//             setNotifyData([]);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         // Only fetch notifications if auth is not loading and we have a user
//         if (!authLoading) {
//             fetchNotification();
//         }
//     }, [currentUser, authLoading]); // Add both as dependencies

//     // Don't render anything until auth is ready
//     if (authLoading) {
//         return null;
//     }

//     return (
//         <NotificatinData.Provider value={{ notifyData, loading }}>
//             {children}
//         </NotificatinData.Provider>
//     );
// }

// export default NotificatinContext;

import React, { createContext, useEffect, useState } from 'react'
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../Services/Firebase.jsx'
import { useAuth } from './AuthContext.jsx';

export const NotificatinData = createContext();

const NotificatinContext = ({ children }) => {
    const { currentUser, loading: authLoading } = useAuth();
    const [notifyData, setNotifyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchNotification = async () => {
        if (!currentUser?.uid) {
            setNotifyData([]);
            setLoading(false);
            return;
        }

        try {
            // Query notifications where toID matches current user's ID
            const notifyQuery = query(
                collection(db, 'notificationCollection'),
                where("toID", '==', currentUser.uid),
                orderBy("createdAt", "desc") // Sort by latest first
            );
            
            const querySnapShot = await getDocs(notifyQuery);
            const data = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() // Convert Firebase timestamp to JS Date
            }));
            
            setNotifyData(data);
            console.log("Fetched notifications:", data);
        } catch (error) {
            console.error("Error in fetching notifications:", error);
            setNotifyData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!authLoading && currentUser?.uid) {
            fetchNotification();
        }
    }, [currentUser?.uid, authLoading]);

    // Don't render anything until auth is ready
    if (authLoading) {
        return null;
    }

    return (
        <NotificatinData.Provider value={{ notifyData, loading, refetchNotifications: fetchNotification }}>
            {children}
        </NotificatinData.Provider>
    );
}

export default NotificatinContext;