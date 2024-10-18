import React from "react";
import { Link, Navigate } from "react-router-dom"; // Ensure Link is imported
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Box,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";

const pages = ["Home", "About"];
const settings = ["Profile", "Logout"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState();

  // Handlers for user settings menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Array destructuring
  const [home, about] = pages;
  const [profile, logout] = settings;

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}
      >
        <Toolbar disableGutters>
          {/* Box for Home and About (now visible at all screen sizes) */}
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={`/`}
            >
              {home}
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={`/${about.toLowerCase()}`}
            >
              {about}
            </Button>
          </Box>

          {/* User Avatar and Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" >{profile}</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{logout}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
