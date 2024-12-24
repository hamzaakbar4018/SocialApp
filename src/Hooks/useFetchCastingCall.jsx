// import { useState, useEffect } from 'react';
// import { collection, doc, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../Services/Firebase';

// const useFetchCastingCall = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [allCalls, setAllCalls] = useState([]);
//   const [allCallsNUsers, setAllCallsNUsers] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchCallsData = async () => {
//     const dummyId = "YTHetwednqeLYoraizuJ4PLFFlp2"
//     setIsLoading(true);
//     setError(null);
//     try {
//       const castingCallsSnapshot = await getDocs(collection(db, "castingCallCollection"));
//       const castingCalls = castingCallsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setAllCalls(castingCalls);

//       // Collect all unique author IDs from the casting calls
//       const authorIDs = [...new Set(castingCalls.map(call => call.authorID).filter(Boolean))];

//       // Fetch user details for the unique author IDs
//       if (authorIDs.length > 0) {
//         const authorsQuery = query(
//           collection(db, "userCollection"),
//           where("docID", "in", authorIDs)
//         );
//         const authorsSnapshot = await getDocs(authorsQuery);
//         const authors = authorsSnapshot.docs.map((doc) => doc.data());

//         // Enrich casting calls with user details
//         const enrichedCastingCalls = castingCalls.map(call => ({
//           ...call,
//           user: authors.find(author => author.docID === call.authorID) || {}
//         }));

//         setAllCallsNUsers(enrichedCastingCalls);
//         console.log("All Data : ",enrichedCastingCalls)
//       }

//     } catch (error) {
//       console.error("Error fetching casting calls:", error);
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCallsData();
//   }, []);

//   return { allCallsNUsers, isLoading, error };
// };

// export default useFetchCastingCall;

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Services/Firebase';
import { useAuth } from '../Context/AuthContext';

const useFetchCastingCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCalls, setAllCalls] = useState([]);
  const [allCallsNUsers, setAllCallsNUsers] = useState([]);
  const [userAppliedCastingCalls, setUserAppliedCastingCalls] = useState([]);
  const [error, setError] = useState(null);
  
  const { currentUser } = useAuth();

  const fetchCallsData = async () => {
    if (!currentUser?.uid) {
      console.error("No current user found");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all casting calls
      const castingCallsSnapshot = await getDocs(collection(db, "castingCallCollection"));
      const castingCalls = castingCallsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        appliedUsers: doc.data().appliedUsers || [] // Ensure appliedUsers is always an array
      }));
      setAllCalls(castingCalls);

      // Collect unique author IDs
      const authorIDs = [...new Set(castingCalls
        .map(call => call.authorID)
        .filter(Boolean))];

      if (authorIDs.length === 0) {
        console.log("No authors found");
        return;
      }

      // Split authorIDs into chunks of 10 due to Firestore "in" query limitation
      const chunkSize = 10;
      const authorChunks = [];
      for (let i = 0; i < authorIDs.length; i += chunkSize) {
        authorChunks.push(authorIDs.slice(i, i + chunkSize));
      }

      // Fetch authors data in chunks
      let allAuthors = [];
      for (const chunk of authorChunks) {
        const authorsQuery = query(
          collection(db, "userCollection"),
          where("docID", "in", chunk)
        );
        const authorsSnapshot = await getDocs(authorsQuery);
        const chunkAuthors = authorsSnapshot.docs.map(doc => doc.data());
        allAuthors = [...allAuthors, ...chunkAuthors];
      }

      // Enrich casting calls with user details
      const enrichedCastingCalls = castingCalls.map(call => ({
        ...call,
        user: allAuthors.find(author => author.docID === call.authorID) || {}
      }));

      setAllCallsNUsers(enrichedCastingCalls);

      // Filter applied casting calls
      const appliedCalls = enrichedCastingCalls.filter(call => 
        Array.isArray(call.appliedUsers) && 
        call.appliedUsers.includes(currentUser.uid)
      );

      setUserAppliedCastingCalls(appliedCalls);
      console.log("User Applied Casting Calls:", appliedCalls);

    } catch (error) {
      console.error("Error fetching casting calls:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      fetchCallsData();
    }
  }, [currentUser]); // Add currentUser as dependency

  return { 
    allCallsNUsers, 
    userAppliedCastingCalls, 
    isLoading, 
    error,
    refetch: fetchCallsData // Expose refetch function
  };
};

export default useFetchCastingCall;

