// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD802KlwrwCHwRezDA0vDisv8rZ13aUIDg",
  authDomain: "cliptube-webapp.firebaseapp.com",
  projectId: "cliptube-webapp",
  storageBucket: "cliptube-webapp.appspot.com",
  messagingSenderId: "575039659535",
  appId: "1:575039659535:web:d18d159b47088c19d28d7a",
  measurementId: "G-34H8C3GV41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);