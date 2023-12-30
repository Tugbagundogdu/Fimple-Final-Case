// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsSB50GgEhpIvqsIgET-Uy3vX-QPU-wP8",
  authDomain: "fimple-final.firebaseapp.com",
  projectId: "fimple-final",
  storageBucket: "fimple-final.appspot.com",
  messagingSenderId: "667823951623",
  appId: "1:667823951623:web:fe4b74004dd5ef3142bfa2",
  measurementId: "G-WK9JHD1WJG"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
getAnalytics(app);