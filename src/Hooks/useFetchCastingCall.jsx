import { useState, useEffect } from 'react';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Services/Firebase';
const useFetchCastingCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [appliedUserData, setAppliedUserData] = useState([]);

  const fetchCastingCall = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "castingCallCollection"));
      const calls = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const allAppliedUserIds = calls.flatMap(call => call.appliedUsers || []);
      let appliedUsersDetails = [];
  
      if (allAppliedUserIds.length > 0) {
        const appliedUsersQuery = query(
          collection(db, "userCollection"),
          where("docID", "in", allAppliedUserIds)
        );
  
        const appliedUsersSnapshot = await getDocs(appliedUsersQuery);
        appliedUsersDetails = appliedUsersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }
  
      // Fetch author details
      const authorIDs = [...new Set(calls.map(call => call.authorID))];
      let usersDetails = [];
  
      if (authorIDs.length > 0) {
        const usersQuery = query(
          collection(db, "userCollection"),
          where("docID", "in", authorIDs)
        );
  
        const userQuerySnapshot = await getDocs(usersQuery);
        usersDetails = userQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }
  
      // Combine applied users and author details for appliedUserData
      const callsWithAppliedUsers = calls.map(call => {
        const authorDetails = usersDetails.find(user => user.docID === call.authorID) || {};
        return {
          ...call,
          appliedUsersDetails: appliedUsersDetails.filter(user =>
            call.appliedUsers?.includes(user.docID)
          ),
          authorDetails
        };
      }).filter(call => call.appliedUsersDetails.length > 0); // Filter out calls without applied users
  
      setAppliedUserData(callsWithAppliedUsers);
  
      // Keep userData logic unchanged
      const callsWithUserData = calls.map(call => {
        const user = usersDetails.find(user => user.docID === call.authorID);
        return {
          ...call,
          user: user || {}
        };
      });
  
      setUserData(callsWithUserData);
  
    } catch (error) {
      console.error("Error fetching casting calls or user details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  



  useEffect(() => {
    fetchCastingCall();
  }, [])

  return { isLoading, userData,appliedUserData   };
}

export default useFetchCastingCall