import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { userObserver } from "../helpers/firebase/firebaseAuthentication";
import BlogDetail from "../pages/BlogDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { NewBlog } from "../pages/NewBlog";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

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
        <Route path="/:id" element={<PrivateRouter />}>
          <Route path="" element={<BlogDetail />} />
        </Route>

        <Route path="/newBlog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
