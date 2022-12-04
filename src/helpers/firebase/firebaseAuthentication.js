// Import the functions you need from the SDKs you need
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";

import { toastsuccess, toastwarn } from "../toastify/Toastify";

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

    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    toastsuccess("Logged in successfully!");
    navigate("/");
  } catch (error) {
    toastwarn(error.message);
  }
};

export const signin = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toastsuccess("Logged in successfully!");
    navigate("/");
  } catch (error) {
    toastwarn(error.message);
  }
};

export const logOut = (navigate) => {
  signOut(auth);
  toastsuccess("Logged out successfully!");
  navigate("/login");
};

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      toastsuccess("Logged in successfully!");
    })
    .catch((error) => {
      toastwarn("Sorry You can not Logged in");
    });
};

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu

  sendPasswordResetEmail(auth, email)
    .then(() => {
      toastwarn("Please check your mail box!");
    })
    .catch((err) => {
      toastwarn("Please enter your email adres");
    });
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;

      setCurrentUser({
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      });
    } else {
      setCurrentUser();
    }
  });
};
