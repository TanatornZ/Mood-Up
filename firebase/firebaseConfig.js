// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn-ddXwMt66QpsERdVwj7IwlMEKKeme0A",
  authDomain: "mood-up-ab8e1.firebaseapp.com",
  projectId: "mood-up-ab8e1",
  storageBucket: "mood-up-ab8e1.appspot.com",
  messagingSenderId: "964782968837",
  appId: "1:964782968837:web:aac6857f2079ee7b618c6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app , db , auth}
