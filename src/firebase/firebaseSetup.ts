import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "../components/toasts/toasts";

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

export async function signup(
  username: string,
  email: string,
  password: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      updateProfile(auth.currentUser!, { displayName: username });
      console.log("user created:", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export async function login(
  email: string,
  password: string,
  pageNavigation: string
) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      window.location.href = pageNavigation;
      console.log("user logged in:", cred.user);
    })
    .catch(() => {
      toast.show({
        title: "Login error",
        content: "This user doesn't exist, please check your email and password!",
        duration: 3000,
      });
    });
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
