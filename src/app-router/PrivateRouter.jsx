import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const PrivateRouter = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser?.displayName ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
