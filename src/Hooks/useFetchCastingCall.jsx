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

const useFetchCastingCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCalls, setAllCalls] = useState([]);
  const [allCallsNUsers, setAllCallsNUsers] = useState([]);
  const [userAppliedCastingCalls, setUserAppliedCastingCalls] = useState([]);
  const [error, setError] = useState(null);

  const fetchCallsData = async () => {
    const dummyId = "YTHetwednqeLYoraizuJ4PLFFlp2"; // Dummy user ID
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all casting calls
      const castingCallsSnapshot = await getDocs(collection(db, "castingCallCollection"));
      const castingCalls = castingCallsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllCalls(castingCalls);

      // Collect all unique author IDs from the casting calls
      const authorIDs = [...new Set(castingCalls.map(call => call.authorID).filter(Boolean))];

      // Fetch user details for the unique author IDs
      if (authorIDs.length > 0) {
        const authorsQuery = query(
          collection(db, "userCollection"),
          where("docID", "in", authorIDs)
        );
        const authorsSnapshot = await getDocs(authorsQuery);
        const authors = authorsSnapshot.docs.map((doc) => doc.data());

        // Enrich casting calls with user details
        const enrichedCastingCalls = castingCalls.map(call => ({
          ...call,
          user: authors.find(author => author.docID === call.authorID) || {}
        }));

        setAllCallsNUsers(enrichedCastingCalls);
        
        console.log("setAllCallsNUsers", enrichedCastingCalls)
        // Now find the casting calls the dummyId user has applied to
        const appliedCastingCalls = enrichedCastingCalls.filter(call => 
          call.appliedUsers && call.appliedUsers.includes(dummyId)
        );

        setUserAppliedCastingCalls(appliedCastingCalls);
        console.log("User Applied Casting Calls:", appliedCastingCalls);
      }

    } catch (error) {
      console.error("Error fetching casting calls:", error);
      setError(error);
    } finally {
      setIsLoading(false);
      console.log(allCallsNUsers)
    }
  };

  useEffect(() => {
    fetchCallsData();
  }, []);

  return { allCallsNUsers, userAppliedCastingCalls, isLoading, error };
};

export default useFetchCastingCall;

