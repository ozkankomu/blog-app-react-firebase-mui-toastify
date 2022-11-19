import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { userObserver } from "../helpers/firebase/firebaseAuthentication";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { NewBlog } from "../pages/NewBlog";
import Register from "../pages/Register";

const AppRouter = () => {
  let currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    userObserver(dispatch);
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newBlog" element={<NewBlog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
