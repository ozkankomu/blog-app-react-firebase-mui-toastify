import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../helpers/firebase/firebaseAuthentication";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [currentBlogs, setCurrentBlogs] = useState();

  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, currentBlogs, setCurrentBlogs }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
