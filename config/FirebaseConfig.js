// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Snpe1I34TZeJMdmWnwOvYuGSpUmnQG0",
  authDomain: "business-book-91c4f.firebaseapp.com",
  projectId: "business-book-91c4f",
  storageBucket: "business-book-91c4f.appspot.com",
  messagingSenderId: "984995154217",
  appId: "1:984995154217:web:2baaa322923fbafad3cf38",
  measurementId: "G-797RLLVGQD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const storage= getStorage(app);
// const analytics = getAnalytics(app);