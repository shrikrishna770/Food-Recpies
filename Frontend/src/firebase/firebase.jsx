// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config (sirf client-side)
const firebaseConfig = {
  apiKey: "AIzaSyCvTRQK5KiSSA8aHLoVWKhVyJv7r8iIi1k",
  authDomain: "auth-9980.firebaseapp.com",
  projectId: "auth-9980",
  storageBucket: "auth-9980.appspot.com",  
  messagingSenderId: "999328972948",
  appId: "1:999328972948:web:5a16c365c2483a3035f481",
  measurementId: "G-7C8XR0HTPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth & Google Provider export karo
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
