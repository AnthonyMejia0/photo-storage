// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA68Jl116u-mq4EdpN2--2GnT3que2SZTM",
  authDomain: "photo-storage-c9aa3.firebaseapp.com",
  projectId: "photo-storage-c9aa3",
  storageBucket: "photo-storage-c9aa3.appspot.com",
  messagingSenderId: "742558364720",
  appId: "1:742558364720:web:59e68f78bf5c4e2c39e9f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };
