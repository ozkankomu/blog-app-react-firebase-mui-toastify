import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
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
    id: new Date().getTime(),
    userId: "email",
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
  console.log(id);
  const db = getDatabase(firebase);
  remove(ref(db, "users/" + id));
  toastwarn("Blog Deleted Successfuly");
};
