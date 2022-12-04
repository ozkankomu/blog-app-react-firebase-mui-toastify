import React, { useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AuthContext } from "../context/AuthContextProvider";
import { userObserver } from "../helpers/firebase/firebaseAuthentication";
import BlogDetail from "../pages/BlogDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { NewBlog } from "../pages/NewBlog";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    userObserver(currentUser, setCurrentUser);
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
