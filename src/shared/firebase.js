// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbdfNgjud3l0JAcqDmotIr0VtSWGUyj44",
  authDomain: "team9-ea050.firebaseapp.com",
  projectId: "team9-ea050",
  storageBucket: "team9-ea050.appspot.com",
  messagingSenderId: "330226005372",
  appId: "1:330226005372:web:09c5fbfac81442607120f9",
  measurementId: "G-JM2P0W00C5"
};

export default firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()

// Initialize Firebase

