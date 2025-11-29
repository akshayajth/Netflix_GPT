// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK 7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN2X3ShvEuyLRuXouN-p0qSj7HkQFcgCI",
  authDomain: "netflixgpt-8719c.firebaseapp.com",
  projectId: "netflixgpt-8719c",
  storageBucket: "netflixgpt-8719c.firebasestorage.app",
  messagingSenderId: "274917854224",
  appId: "1:274917854224:web:ad27a6d883de2fb40b8e95",
  measurementId: "G-Y5V09Y1KQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();