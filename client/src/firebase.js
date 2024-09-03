// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "espacios-mexico-27d9c.firebaseapp.com",
  projectId: "espacios-mexico-27d9c",
  storageBucket: "espacios-mexico-27d9c.appspot.com",
  messagingSenderId: "876379662238",
  appId: "1:876379662238:web:d8268b02cc761bb512588f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);