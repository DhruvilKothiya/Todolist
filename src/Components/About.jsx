import React from "react";
import { Container, Paper, Typography, Grid, Button, Box } from "@mui/material";

// Sample image URL (replace with your own)
// const heroImage = "https://source.unsplash.com/random/800x400?business";

export default function About() {
  return (
    <Container maxWidth="lg" style={{ padding: "20px", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        {/* <img
          src={heroImage}
          alt="About Us"
          style={{ width: "100%", height: "auto" }}
        /> */}
        <Box padding={3}>
          <Typography variant="h2" align="center" gutterBottom sx={{fontSize:'1.75rem'}}>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our application! We are dedicated to providing the best
            experience for our users. Our team is committed to ensuring that you
            have all the tools you need to manage your tasks efficiently.
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        style={{
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{fontSize:'1.75rem'}}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to empower individuals and teams by simplifying task
          management and enhancing productivity. We believe that with the right
          tools, anyone can achieve their goals and make the most of their time.
        </Typography>

        <Typography variant="h4" align="center" gutterBottom sx={{fontSize:'1.75rem'}}>
          Contact Us
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Email:</strong> support@example.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Phone:</strong> (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop={2}>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
