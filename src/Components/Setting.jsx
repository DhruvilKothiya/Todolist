import React, { useContext } from "react";
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";
import { ThemeContext } from "../ThemeContext";

const Setting = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Settings</Typography>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleTheme} />}
        label="Dark Mode"
      />
    </Box>
  );
};

export default Setting;
