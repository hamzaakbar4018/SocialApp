import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../Services/Firebase';

export const useCastingData = (callId) => {
  const [data, setData] = useState({
    receivedUsers: [],
    acceptedUsers: [],
    rejectedUsers: [],
    isLoading: false,
    error: null
  });

  const fetchApplications = useCallback(async (status) => {
    if (!callId) return [];
    
    try {
      const applicationsQuery = query(
        collection(db, "castingCallCollection", callId, "applicationCollection"),
        where(status, "==", true)
      );

      const applicationSnapshot = await getDocs(applicationsQuery);
      const applications = applicationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch casting call data
      const castingCallDocRef = doc(db, "castingCallCollection", callId);
      const castingCallSnapshot = await getDoc(castingCallDocRef);
      const castingCallData = castingCallSnapshot.exists()
        ? { id: castingCallSnapshot.id, ...castingCallSnapshot.data() }
        : null;

      // Enrich applications with user data
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
              castingCallData
            };
          } catch (error) {
            console.error("Error enriching application:", error);
            return { ...application, castingCallData };
          }
        })
      );

      return enrichedApplications;
    } catch (error) {
      console.error(`Error fetching ${status} applications:`, error);
      throw error;
    }
  }, [callId]);

  const fetchAllData = useCallback(async () => {
    if (!callId) return;

    setData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const [received, accepted, rejected] = await Promise.all([
        fetchApplications("isPending"),
        fetchApplications("isAccepted"),
        fetchApplications("isRejected")
      ]);

      setData({
        receivedUsers: received,
        acceptedUsers: accepted,
        rejectedUsers: rejected,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  }, [callId, fetchApplications]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleStatusUpdate = useCallback((applicationId, status) => {
    setData(prev => ({
      ...prev,
      receivedUsers: prev.receivedUsers.filter(user => user.id !== applicationId),
      acceptedUsers: status === 'accepted' 
        ? [...prev.acceptedUsers, prev.receivedUsers.find(user => user.id === applicationId)]
        : prev.acceptedUsers,
      rejectedUsers: status === 'rejected'
        ? [...prev.rejectedUsers, prev.receivedUsers.find(user => user.id === applicationId)]
        : prev.rejectedUsers
    }));
  }, []);

  return {
    ...data,
    refreshData: fetchAllData,
    handleStatusUpdate
  };
};