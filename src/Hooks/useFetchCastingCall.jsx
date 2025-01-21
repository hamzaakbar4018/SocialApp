// import { useState, useEffect } from 'react';
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from '../Services/Firebase';
// import { useAuth } from '../Context/AuthContext';

// const useFetchCastingCall = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [allCalls, setAllCalls] = useState([]);
//   const [allCallsNUsers, setAllCallsNUsers] = useState([]);
//   const [userAppliedCastingCalls, setUserAppliedCastingCalls] = useState([]);
//   const [error, setError] = useState(null);
  
//   // Move useAuth to the top level
//   const { currentUser } = useAuth();

//   const fetchCallsData = async () => {
//     if (!currentUser?.uid) {
//       // console.error("No current user found");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Create a query with orderBy 'createdAt' in descending order
//       const castingCallsQuery = query(
//         collection(db, "castingCallCollection"),
//         orderBy("createdAt", "desc") // Order by createdAt descending
//       );

//       const castingCallsSnapshot = await getDocs(castingCallsQuery);
//       const castingCalls = castingCallsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         appliedUsers: doc.data().appliedUsers || []
//       }));
//       setAllCalls(castingCalls);

//       // Collect all unique author IDs from the casting calls
//       const authorIDs = [...new Set(castingCalls.map(call => call.authorID).filter(Boolean))];

//       // Fetch user details for the unique author IDs
//       if (authorIDs.length > 0) {
//         // Split authorIDs into chunks of 10 due to Firestore "in" query limitation
//         const chunkSize = 10;
//         const authorChunks = [];
//         for (let i = 0; i < authorIDs.length; i += chunkSize) {
//           authorChunks.push(authorIDs.slice(i, i + chunkSize));
//         }

//         let allAuthors = [];
//         for (const chunk of authorChunks) {
//           const authorsQuery = query(
//             collection(db, "userCollection"),
//             where("docID", "in", chunk)
//           );
//           const authorsSnapshot = await getDocs(authorsQuery);
//           const chunkAuthors = authorsSnapshot.docs.map(doc => doc.data());
//           allAuthors = [...allAuthors, ...chunkAuthors];
//         }

//         // Enrich casting calls with user details
//         const enrichedCastingCalls = castingCalls.map(call => ({
//           ...call,
//           user: allAuthors.find(author => author.docID === call.authorID) || {}
//         }));

//         setAllCallsNUsers(enrichedCastingCalls);
//         // console.log("All Data : ", enrichedCastingCalls);

//         // Find calls where the user has applied
//         const appliedCalls = enrichedCastingCalls.filter(call => 
//           Array.isArray(call.appliedUsers) && 
//           call.appliedUsers.includes(currentUser.uid)
//         );

//         setUserAppliedCastingCalls(appliedCalls);
//         // console.log("User Applied Calls : ", appliedCalls);
//       }

//     } catch (error) {
//       // console.error("Error fetching casting calls:", error);
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (currentUser?.uid) {
//       fetchCallsData();
//     }
//   }, [currentUser]); // Add currentUser as dependency

//   // Helper function to check if user has applied to a specific casting call
//   const hasUserApplied = (castingCallId) => {
//     if (!currentUser?.uid) return false;
//     const call = allCalls.find(call => call.id === castingCallId);
//     return call?.appliedUsers?.includes(currentUser.uid) || false;
//   };

//   // Helper function to get a specific applied call
//   const getAppliedCall = (castingCallId) => {
//     return userAppliedCastingCalls.find(call => call.id === castingCallId);
//   };

//   return { 
//     allCallsNUsers, 
//     userAppliedCastingCalls,
//     isLoading, 
//     error,
//     hasUserApplied,
//     getAppliedCall,
//     refetch: fetchCallsData,
//     fetchCallsData
//   };
// };

// export default useFetchCastingCall;
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
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
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a query with orderBy 'createdAt' in descending order
      const castingCallsQuery = query(
        collection(db, "castingCallCollection"),
        orderBy("createdAt", "desc")
      );

      const castingCallsSnapshot = await getDocs(castingCallsQuery);
      const castingCalls = castingCallsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        appliedUsers: doc.data().appliedUsers || []
      }));
      setAllCalls(castingCalls);

      // Collect all unique author IDs from the casting calls
      const authorIDs = [...new Set(castingCalls.map(call => call.authorID).filter(Boolean))];

      // Fetch user details for the unique author IDs
      if (authorIDs.length > 0) {
        // Split authorIDs into chunks of 10 due to Firestore "in" query limitation
        const chunkSize = 10;
        const authorChunks = [];
        for (let i = 0; i < authorIDs.length; i += chunkSize) {
          authorChunks.push(authorIDs.slice(i, i + chunkSize));
        }

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

        // Only set applied calls if user is logged in
        if (currentUser?.uid) {
          const appliedCalls = enrichedCastingCalls.filter(call => 
            Array.isArray(call.appliedUsers) && 
            call.appliedUsers.includes(currentUser.uid)
          );
          setUserAppliedCastingCalls(appliedCalls);
        }
      }

    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data regardless of user login status
    fetchCallsData();
  }, []); // Remove currentUser dependency

  // Helper function to check if user has applied to a specific casting call
  const hasUserApplied = (castingCallId) => {
    if (!currentUser?.uid) return false;
    const call = allCalls.find(call => call.id === castingCallId);
    return call?.appliedUsers?.includes(currentUser.uid) || false;
  };

  // Helper function to get a specific applied call
  const getAppliedCall = (castingCallId) => {
    return userAppliedCastingCalls.find(call => call.id === castingCallId);
  };

  return { 
    allCallsNUsers, 
    userAppliedCastingCalls,
    isLoading, 
    error,
    hasUserApplied,
    getAppliedCall,
    refetch: fetchCallsData,
    fetchCallsData
  };
};

export default useFetchCastingCall;