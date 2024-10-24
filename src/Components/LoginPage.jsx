// src/pages/LoginPage.js
import React, { useContext, useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = async () => {
    try {
      const loginPayload = { email, password };
      const response = await axios.post(
        "http://localhost:8000/token",
        loginPayload
      );
      const { access_token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", access_token);

      // Dispatch login action with true (successful login)
      dispatch(login());

      // Navigate to Todo List page after login
      navigate("/todolist");
    } catch (error) {
      // Dispatch login action with false (failed login)
      // dispatch(logout());

      console.error("Login error:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: darkMode
          ? "linear-gradient(#212121, #2e2e2e)"
          : "linear-gradient(#94FFD8, #2ab1e0, #348beb)",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: darkMode ? "#424242" : "#fff",
        }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ width: "100%" }}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
}
