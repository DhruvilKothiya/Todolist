import React, { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
        palette: {
          mode: darkMode ? "dark":'light',
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#ff4081",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1d1d1d" : "#fff",
          },
        },
    typography: {
      fontFamily: "Poppins, Roboto, Arial, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
