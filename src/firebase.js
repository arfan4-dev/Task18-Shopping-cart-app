// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage } from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBlYKLmQxrxPfwcj4vak0sVSPp_QYghmyI",
  authDomain: "e-commerce-site-41ae4.firebaseapp.com",
  projectId: "e-commerce-site-41ae4",
  storageBucket: "e-commerce-site-41ae4.appspot.com",
  messagingSenderId: "306214011662",
  appId: "1:306214011662:web:97cc136ddc75ff5026cd5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore() 

export default app;
