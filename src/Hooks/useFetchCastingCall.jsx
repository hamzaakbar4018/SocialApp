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
      // Fetch casting calls
      const querySnapshot = await getDocs(collection(db, "castingCallCollection"));
      const calls = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch applied users details
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

      // Combine casting calls with applied users details
      const callsWithAppliedUsers = calls.map(call => ({
        ...call,
        appliedUsersDetails: appliedUsersDetails.filter(user =>
          call.appliedUsers?.includes(user.docID)
        )
      }));
      console.log(callsWithAppliedUsers)
      setAppliedUserData(callsWithAppliedUsers);


      const authorIDs = calls.map(doc => doc.authorID);
      let usersDetails = [];

      if (authorIDs.length > 0) {
        const usersQuery = query(
          collection(db, "userCollection"),
          where("docID", "in", authorIDs) // Make sure 'docID' is the field in your user collection
        );

        const userQuerySnapshot = await getDocs(usersQuery);

        usersDetails = userQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }

      const callsWithUserData = calls.map(call => {
        const user = usersDetails.find(user => user.docID === call.authorID);
        return {
          ...call,
          user: user || {}
        };
      });

      setUserData(callsWithUserData);
      // console.log("All data", callsWithUserData);
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