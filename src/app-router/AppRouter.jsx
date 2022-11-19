import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { NewBlog } from "../pages/NewBlog";
import Register from "../pages/Register";

const AppRouter = () => {
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
