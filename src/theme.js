// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Mobile devices
      sm: 600, // Tablets
      md: 960, // Small laptops
      lg: 1280, // Desktops
      xl: 1920, // Large screens
    },
  },
});

export default theme;
