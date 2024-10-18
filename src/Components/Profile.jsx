import React from "react";
import { Avatar, Typography, Box } from "@mui/material";

const Profile = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h5">User Name</Typography>
      <Typography variant="body1">user.email@example.com</Typography>
      {/* Add more user details as needed */}
    </Box>
  );
};

export default Profile;
