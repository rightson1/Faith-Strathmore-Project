import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDnk7hp4tswTP7hZRnlCpqBKL9NX52FNwM",
  authDomain: "prediction-price.firebaseapp.com",
  projectId: "prediction-price",
  storageBucket: "prediction-price.appspot.com",
  messagingSenderId: "976981622573",
  appId: "1:976981622573:web:340a6eb4f2a8cf289f1da4",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
