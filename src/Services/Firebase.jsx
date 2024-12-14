import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAE2OgJQzPKFsd44q3kT3bmmzePw87BV4Y",
  authDomain: "youtooart-3f80c.firebaseapp.com",
  projectId: "youtooart-3f80c",
  storageBucket: "youtooart-3f80c.appspot.com",
  messagingSenderId: "766821148350",
  appId: "1:766821148350:web:bfe9baf66efc977af360ef",
  measurementId: "G-NDT94YMXT3"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);