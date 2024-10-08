// src/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming you have Navbar.js

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
