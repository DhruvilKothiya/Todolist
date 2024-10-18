import React from "react";
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";

const Setting = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
    // Implement theme change logic here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Settings</Typography>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
        label="Dark Mode"
      />
      {/* Add more settings options as needed */}
    </Box>
  );
};

export default Setting;
