import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKRCRHA1qId_wqeGmX2kPwUAtDoR22en0",
  authDomain: "rideboardapp-6c32d.firebaseapp.com",
  projectId: "rideboardapp-6c32d",
  storageBucket: "rideboardapp-6c32d.firebasestorage.app",
  messagingSenderId: "118608137060",
  appId: "1:118608137060:web:0d55f072ed27c9b2184871",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistent login
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;