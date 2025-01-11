import React, { createContext, useEffect, useState } from 'react'
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { db } from '../Services/Firebase.jsx'
import { useAuth } from './AuthContext.jsx';

export const NotificatinData = createContext();

const NotificatinContext = ({ children }) => {
    const { currentUser, loading: authLoading } = useAuth();
    const [notifyData, setNotifyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRelativeTime = (timestamp) => {
        if (!timestamp) return 'Date not available';
        try {
            const date = timestamp.toDate();
            return formatDistanceToNow(date, { addSuffix: true });
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Date not available';
        }
    };

    const fetchNotification = async () => {
        if (!currentUser?.uid) {
            setNotifyData([]);
            setLoading(false);
            return;
        }

        try {
            const notifyQuery = query(
                collection(db, 'notificationCollection'),
                where("toID", '==', currentUser.uid),
                orderBy("createdAt", "desc") // Sort by latest first
            );

            const querySnapShot = await getDocs(notifyQuery);
            const data = querySnapShot.docs.map((doc) => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    ...docData,
                    relativeTime: getRelativeTime(docData.createdAt)
                };
            });

            setNotifyData(data);
            console.log("Fetched notifications:", data);
        } catch (error) {
            console.error("Error in fetching notifications:", error);
            setNotifyData([]);
        } finally {
            setLoading(false);
        }
    }

    // Update notifications every minute to keep relative times current
    useEffect(() => {
        if (!authLoading && currentUser?.uid) {
            fetchNotification();

            // Set up interval to update relative times
            const intervalId = setInterval(() => {
                setNotifyData(prevData =>
                    prevData.map(notification => ({
                        ...notification,
                        relativeTime: getRelativeTime(notification.createdAt)
                    }))
                );
            }, 60000); // Update every minute

            return () => clearInterval(intervalId);
        }
    }, [currentUser?.uid, authLoading]);

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