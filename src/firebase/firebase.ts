// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAda1JmAN-Du47KrxGM6W2uBycAocsDamg",
    authDomain: "fireplay-28282.firebaseapp.com",
    projectId: "fireplay-28282",
    storageBucket: "fireplay-28282.firebasestorage.app",
    messagingSenderId: "923118400958",
    appId: "1:923118400958:web:a553f8c661f1dbdd2035ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { addDoc, collection };