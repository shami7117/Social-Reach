// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMx6xjMI7EO1eur5Xxmj8iZkZlgGq04w0",
  authDomain: "socialreach-b47ae.firebaseapp.com",
  projectId: "socialreach-b47ae",
  storageBucket: "socialreach-b47ae.appspot.com",
  messagingSenderId: "667112490533",
  appId: "1:667112490533:web:74355365c1685da74661cc",
  measurementId: "G-33X7J5RE21"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
