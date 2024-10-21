import React, { useState } from "react";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Prepare login payload
      const loginPayload = {
        email,
        password,
      };

      // Send login request to your FastAPI backend
      const response = await axios.post(
        "http://localhost:8000/token",
        loginPayload
      );
      console.log('response',response.data)

      // Extract token from the response
      const { access_token } = response.data;

      // Store token in localStorage (or use context)
      localStorage.setItem("token", access_token);

      // On successful login, navigate to the Todo List page
      navigate("/todolist");
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(#94FFD8,#2ab1e0,#348beb)",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Typography variant="h1" align="center" gutterBottom>
            Login
          </Typography>

          {/* Email Field */}

          {/* Username Field */}
          {/* <TextField
            fullWidth
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "20px" }}
          /> */}

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

          {/* Login Button */}
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
    </ThemeProvider>
  );
}
