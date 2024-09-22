// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOOC4iKgA_2YMuQ8ihDsIgRJrzQ881Q2E",
  authDomain: "muteengine-task.firebaseapp.com",
  projectId: "muteengine-task",
  storageBucket: "muteengine-task.appspot.com",
  messagingSenderId: "897270356872",
  appId: "1:897270356872:web:c0aff19da19488f874f83d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}