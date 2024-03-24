// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxbyKDZVmNa8b6zGqh8rmI6W-Z45_3ezQ",
    authDomain: "manda-store-locator.firebaseapp.com",
    projectId: "manda-store-locator",
    storageBucket: "manda-store-locator.appspot.com",
    messagingSenderId: "784192844789",
    appId: "1:784192844789:web:62fe5e66c2bc08888ca6bc",
    measurementId: "G-BV3FCCFN9B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
