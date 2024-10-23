import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePhoto: null, // New state for profile photo
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    // Simulating fetching user data from an API or local storage
    const fetchUserData = () => {
      const userData = JSON.parse(localStorage.getItem("user")); // Assume user data is stored in localStorage
      if (userData) {
        setUser(userData);
        if (userData.profilePhoto) {
          setImagePreview(userData.profilePhoto); // Set preview if photo exists
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview
      };
      reader.readAsDataURL(file); // Convert the file to base64
      setUser({ ...user, profilePhoto: file }); // Save the file in state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., updating user data in an API
    console.log("Updated user data:", user);
    // You can also update localStorage if needed
    const userDataToSave = { ...user, profilePhoto: imagePreview }; // Include image preview in saved data
    localStorage.setItem("user", JSON.stringify(userDataToSave));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            type="email"
          />
          {/* Profile Photo Upload */}
          <Box mb={2}>
            <input
              accept="image/*"
              type="file"
              id="profile-photo-upload"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profile-photo-upload">
              <Button variant="contained" component="span">
                Upload Profile Photo
              </Button>
            </label>
            {imagePreview && (
              <Avatar
                src={imagePreview}
                alt="Profile Photo"
                sx={{ width: 56, height: 56, mt: 2 }}
              />
            )}
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
