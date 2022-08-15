/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI8-MC5S1BJphsti7ANTwMXx0fsmLItqE",
  authDomain: "uniqueco-33e4c.firebaseapp.com",
  projectId: "uniqueco-33e4c",
  storageBucket: "uniqueco-33e4c.appspot.com",
  messagingSenderId: "536672680644",
  appId: "1:536672680644:web:ca94fbc924619ce2646791",
  databaseURL:
    "https://uniqueco-33e4c-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function passAuth() {
  return auth;
}
export function testAPP() {
  console.log(app);
}

export function checkLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("user logged in", uid);
      global.USERID = uid;
    } else {
      console.log("no user logged in");
    }
  });
}

export const signUpUser = async (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
      return user;
    });
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const sendEmailWithPassword = async (email) => {
  try {
    await sendPasswordResetEmail(email);
    console.log("success");
    return {};
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const signInUser = async (email, password) => {};
