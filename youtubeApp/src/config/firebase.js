import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signInWithRedirect, getRedirectResult} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDA2yG10vxg_Cke-7eeyEaA5n1IlN2ml4c",
    authDomain: "fir-a796c.firebaseapp.com",
    projectId: "fir-a796c",
    storageBucket: "fir-a796c.appspot.com",
    messagingSenderId: "689144653133",
    appId: "1:689144653133:web:528dcb9df758dd41e4c304"
};
// project-689144653133

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export { provider, auth , signInWithRedirect, getRedirectResult} 