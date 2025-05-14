// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAarQSdx6xkGXampxkCM-pxSxASVhNijt8",
  authDomain: "healthcareapp-e9214.firebaseapp.com",
  projectId: "healthcareapp-e9214",
  storageBucket:"healthcareapp-e9214.firebasestorage.app" ,
  messagingSenderId: "929681036900",
  appId: "1:929681036900:web:363e4191e0ece70cbf3171",
  measurementId: "G-Y9G6MRSJJ9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 