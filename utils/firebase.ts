import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAZEmSpXUE5899Y_aAMd-7xBm3qLYq8xms",
  authDomain: "faith-d3f59.firebaseapp.com",
  projectId: "faith-d3f59",
  storageBucket: "faith-d3f59.appspot.com",
  messagingSenderId: "554769999454",
  appId: "1:554769999454:web:63cd051f87e19b072776cf",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
