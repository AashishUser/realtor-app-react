// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDjOG39andkGoQvPhW_U51fQhyYthnUKg",
  authDomain: "realtor-clone-react-9c0fb.firebaseapp.com",
  projectId: "realtor-clone-react-9c0fb",
  storageBucket: "realtor-clone-react-9c0fb.firebasestorage.app",
  messagingSenderId: "513979716290",
  appId: "1:513979716290:web:47aaa85db5ba9633b5e15b",
  measurementId: "G-CHMZ5JTYGW",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
