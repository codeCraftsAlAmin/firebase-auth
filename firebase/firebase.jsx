import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI2yLoi3v0cTodDsJaPwUssEFcV1N14e4",
  authDomain: "react-firebase-auth-6efdf.firebaseapp.com",
  projectId: "react-firebase-auth-6efdf",
  storageBucket: "react-firebase-auth-6efdf.firebasestorage.app",
  messagingSenderId: "745653439902",
  appId: "1:745653439902:web:7d87be8d1d80d1d2d45a8f",
  measurementId: "G-R6X5E9EZSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
