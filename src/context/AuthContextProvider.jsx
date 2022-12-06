import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../helpers/firebase/firebaseAuthentication";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentBlogs, setCurrentBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userObserver(setCurrentUser);
  }, [userObserver]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, currentBlogs, setCurrentBlogs }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
