import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Media query hook to detect screen size
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handlesubmit = () => {
    // Generate a UUID
    const token = uuidv4();
    console.log(token);

    // Navigate to TokenPage with the UUID as a route parameter
    navigate(`/tokenpage?token=${token}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: isMobile ? 2 : 4,
        backgroundColor: isMobile ? "#f0f0f0" : "#e0e0e0",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h3"}
        align="center"
        sx={{
          marginBottom: 2,
        }}
      >
        Home Page
      </Typography>
      <Button
        variant="contained"
        size={isMobile ? "small" : "large"}
        onClick={handlesubmit}
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Display
      </Button>
    </Box>
  );
};

export default Home;
