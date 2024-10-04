// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: "yellow", // Set the background to light blue
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-end", // Aligns the content to the right
    alignItems: "center",
  };

  const linkStyle = {
    color: "#333", // Darker color for better contrast on light background
    textDecoration: "none",
    margin: "0 1rem",
    fontWeight: "bold",
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
    marginLeft: "auto", // Pushes the content to the right
  };

  return (
    <nav style={navbarStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={linkStyle}>
            About
          </Link>
        </li>
        <li>
          <Link to="/todolist" style={linkStyle}>
            TodoList
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
