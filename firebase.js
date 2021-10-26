// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7-WORWzaZ-EIUA_9cQ8JbGs2DCanIUxQ",
    authDomain: "instagramwithsonny.firebaseapp.com",
    projectId: "instagramwithsonny",
    storageBucket: "instagramwithsonny.appspot.com",
    messagingSenderId: "763677745331",
    appId: "1:763677745331:web:106b1d1692154f864c10c6"
};

// Initialize Firebase
const app = !getApps().length ?  initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }