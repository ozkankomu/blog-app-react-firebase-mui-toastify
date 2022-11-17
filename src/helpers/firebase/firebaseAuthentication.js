// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZLnFPNxePKqdTWKEeVBlDzHnZwC6Z690",
  authDomain: "blog-app-bb846.firebaseapp.com",
  databaseURL: "https://blog-app-bb846-default-rtdb.firebaseio.com",
  projectId: "blog-app-bb846",
  storageBucket: "blog-app-bb846.appspot.com",
  messagingSenderId: "479239463344",
  appId: "1:479239463344:web:ccec37c5c786e9b8dbf675",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const Signup = async (email, password, navigate, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: displayName });
    navigate("/");
  } catch (error) {}
};
