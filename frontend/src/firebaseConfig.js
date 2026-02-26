// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// --- 1. ADD THIS IMPORT ---
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries\'][][]// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAobsDnWMsIjzJ6_F9IWLvY4D86ZI0MtXU",
  authDomain: "realorganic-cd84d.firebaseapp.com",
  projectId: "realorganic-cd84d",
  storageBucket: "realorganic-cd84d.firebasestorage.app",
  messagingSenderId: "896725694644",
  appId: "1:896725694644:web:cf6e56619d1d3be4c2bfe1",
  measurementId: "G-VH3JB80BQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// This 'export' is what AuthContext is looking for
export const auth = getAuth(app);