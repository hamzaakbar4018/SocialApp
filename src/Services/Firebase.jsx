import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAE2OgJQzPKFsd44q3kT3bmmzePw87BV4Y",
//   authDomain: "youtooart-3f80c.firebaseapp.com",
//   projectId: "youtooart-3f80c",
//   storageBucket: "youtooart-3f80c.appspot.com",
//   messagingSenderId: "766821148350",
//   appId: "1:766821148350:web:bfe9baf66efc977af360ef",
//   measurementId: "G-NDT94YMXT3"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC71PL78OqpvK8du5qjxPokADCPJ3vLGUA",
  authDomain: "cinetroop-5b5b3.firebaseapp.com",
  projectId: "cinetroop-5b5b3",
  storageBucket: "cinetroop-5b5b3.firebasestorage.app",
  messagingSenderId: "850962572055",
  appId: "1:850962572055:web:35239d8ac07d09e23bcd52",
  measurementId: "G-FLHPFL8VP3"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };

