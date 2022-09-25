import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJxPecW3Om_8yqAVrluPagAzqxK1n5ETM",
  authDomain: "react-app-237f9.firebaseapp.com",
  projectId: "react-app-237f9",
  storageBucket: "react-app-237f9.appspot.com",
  messagingSenderId: "701261488825",
  appId: "1:701261488825:web:c1a3143dbcf12823b4b168",
  measurementId: "G-JVRJ62MYR5",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signup(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export async function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

export async function logout() {
  signOut(auth)
    .then(() => {
      console.log("user signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export const db = getFirestore(app);
