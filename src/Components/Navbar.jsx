import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { logout as reduxLogout, login } from "../Store/authSlice";
import { useDispatch } from "react-redux";

const pages = ["Home", "About"];
const settings = ["Profile", "Logout"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();
  // console.log(location, "test 123")

  // Handlers for user settings menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(reduxLogout())
    localStorage.removeItem("token"); // Correctly remove token
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Toggle between Register and Login
  const handleAuthAction = () => {
    if (location.pathname!=="/login") {
      navigate("/login");
    } else {  
      navigate("/register");
    }
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

          {/* Toggle between Register and Login */}
          {!auth && (
            <Box>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleAuthAction} // Call the function to handle auth action
              >
                {location.pathname!=="/login" ? "Login" : "Sign Up"}
              </Button>
            </Box>
          )}

          {/* User Avatar and Settings */}
          {auth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Dhruvil" src="/static/images/avatar/2.jpg" sx={{color:'white'}}/>
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
                <MenuItem onClick={handleProfile}>
                  <Typography textAlign="center">{profile}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">{logout}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
