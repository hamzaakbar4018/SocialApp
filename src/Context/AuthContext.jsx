import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { auth, db } from '../Services/Firebase'; // Adjust path as needed
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth State Changed - User:", user);
  
      if (user) {
        try {
          console.log("User UID:", user.uid);
          console.log("User Phone Number:", user.phoneNumber);
  
          const userDocRef = doc(db, 'userCollection', user.uid);
          const userDocSnap = await getDoc(userDocRef);
  
          console.log("User Document Exists:", userDocSnap.exists());
          if (userDocSnap.exists()) {
            console.log("Existing User Data:", userDocSnap.data());
          }
        } catch (error) {
          console.error("Detailed Auth Error:", error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  // Sign out function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Provide context values
  return (
    <AuthContext.Provider value={{ currentUser, userData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};