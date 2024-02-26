// Import the function to initialize the app
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3_KX7M8dMVTRImwMGXfmFjZQt1tDHJYQ",
  authDomain: "unijet-email-verification.firebaseapp.com",
  projectId: "unijet-email-verification",
  storageBucket: "unijet-email-verification.appspot.com",
  messagingSenderId: "375561533323",
  appId: "1:375561533323:web:d2efe19f5d58a66d8ae18e",
  measurementId: "G-0BDFC19Z41"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
