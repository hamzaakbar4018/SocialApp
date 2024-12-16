import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { auth, db } from '../Services/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Set the current user from Firebase Authentication
          setCurrentUser(user);

          // Fetch user document from Firestore
          const userDocRef = doc(db, 'userCollection', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // If user document exists, set the user data
            const userData = userDocSnap.data();
            setUserData(userData);
          } else {
            // If no user document exists, you might want to create one
            // or handle this case as needed
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        } finally {
          // Ensure loading is set to false once process is complete
          setLoading(false);
        }
      } else {
        // No user is signed in
        setCurrentUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to update user data
  const updateUserData = async (newUserData) => {
    if (!currentUser) {
      console.error("No authenticated user");
      return false;
    }

    try {
      const userDocRef = doc(db, 'userCollection', currentUser.uid);
      await setDoc(userDocRef, newUserData, { merge: true });
      setUserData(prev => ({ ...prev, ...newUserData }));
      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Provide context values
  const contextValue = {
    currentUser,
    userData,
    loading,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};