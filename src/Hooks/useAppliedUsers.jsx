import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Adjust the import path for your firebase config

export const useAppliedUsers = (appliedUsers) => {
  const [appliedUser, setAppliedUser] = useState([]);

  const fetchAppliedUsers = async (id) => {
    try {
      // Query the 'userCollection' based on docID
      const fetchQuery = query(
        collection(db, "userCollection"),
        where("docID", "==", id)
      );

      // Fetch the query results
      const querySnapShot = await getDocs(fetchQuery);

      // Map through the docs and get the user data
      const users = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set the users to the state
      setAppliedUser(users);

      // Log users for debugging
      console.log("Applied Users Details:", users);
    } catch (error) {
      console.error("Error fetching applied users:", error);
    }
  };

  useEffect(() => {
    if (appliedUsers && appliedUsers.length > 0) {
      appliedUsers.forEach((userId) => {
        console.log(userId);
        fetchAppliedUsers(userId);
      });
    }
  }, [appliedUsers]);

  return appliedUser; // Return the fetched users
};
