import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#333",
    },
  },
});

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleRegister = async () => {
    try {
      // Prepare registration payload
      const registerPayload = {
        name,
        email,
        password,
      };

      // Send registration request to your FastAPI backend
      const response = await axios.post(
        "http://localhost:8000/users/",
        registerPayload
      );
      console.log("API Response:", response);
      alert("Registration successful! Please log in.");
      navigate("/todolist");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please check your details.");
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
          ? "linear-gradient(#212121, #2e2e2e)" // Dark mode background
          : "linear-gradient(#94FFD8, #2ab1e0, #348beb)", // Light mode background
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: darkMode ? "#424242" : "#fff", // Adapt paper background to theme
        }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          Register Page
        </Typography>

        {/* Name Field */}
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {/* Register Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          style={{ width: "100%" }}
        >
          Register
        </Button>
      </Paper>
    </div>
  );
}
