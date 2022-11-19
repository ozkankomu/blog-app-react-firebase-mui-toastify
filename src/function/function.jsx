import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { useState } from "react";
import firebase from "../helpers/firebase/firebaseDb";

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
  const [contactList, setContactList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const db = getDatabase();

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
  return { isLoading, contactList };
};
