
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "geeksdeck-41114.firebaseapp.com",
  projectId: "geeksdeck-41114",
  storageBucket: "geeksdeck-41114.appspot.com",
  messagingSenderId: "54083378679",
  appId: "1:54083378679:web:ef003325c7f0221374e2f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;