import { Info } from "@mui/icons-material";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import firebase from "../helpers/firebase/firebaseDb";
import { toastwarn } from "../helpers/toastify/Toastify";

export const AddUser = (form) => {
  const db = getDatabase(firebase);
  const userRef = ref(db, "users/");
  const newUserRef = push(userRef);
  set(newUserRef, {
    title: form.title,
    imageUrl: form.imageUrl,
    content: form.content,
    username: form.username,
    email: form.email,
    photoURL: form.photoURL,
    date: new Date().toLocaleString("tr-TR"),
    comments: [],
  });
};

export const useGetData = () => {
  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const db = getDatabase(firebase);
    const userRef = ref(db, "users/");

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const userArray = [];
      for (let id in data) {
        userArray.push({ id, ...data[id] });
      }
      setContactList(userArray);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, contactList };
};

export const deleteBlog = (id) => {
  const db = getDatabase(firebase);
  remove(ref(db, "users/" + id));
  toastwarn("Blog Deleted Successfuly");
};

export const updateBlog = (comment) => {
  const db = getDatabase(firebase);
  const userRef = ref(db, "users/");
  const updates = {};
  updates["users/" + comment.id] = comment;

  return update(ref(db), updates);
};
