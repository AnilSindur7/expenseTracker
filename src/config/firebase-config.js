// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore }from "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANYPVYHSfOx8P4MkQWAbYZvx1pNdgklT8",
  authDomain: "expense-tracker-57132.firebaseapp.com",
  projectId: "expense-tracker-57132",
  storageBucket: "expense-tracker-57132.appspot.com",
  messagingSenderId: "201145688131",
  appId: "1:201145688131:web:8e0da41d9456b07720f4f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
