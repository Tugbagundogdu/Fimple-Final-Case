// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCPZ0qWeHTmPJKhnO0NaBw0KPHmj_jj08",
  authDomain: "fimple-3fa28.firebaseapp.com",
  projectId: "fimple-3fa28",
  storageBucket: "fimple-3fa28.appspot.com",
  messagingSenderId: "887051100268",
  appId: "1:887051100268:web:62822e34b76cf021f9b849"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}