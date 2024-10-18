import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import logo from "/home/dhruvil/TodoList1/todolist/src/Components/checklist-ezgif.com-gif-maker.gif";
import "./Layout.css"; // Import your new CSS file

const drawerWidth = 240;

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className="layout">
      <CssBaseline />

      {/* AppBar with conditional class names */}
      <AppBar position="fixed" className={`app-bar ${open ? "open" : ""}`}>
        <Toolbar sx={{ paddingRight: "15px !important" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ width: "100%" }}>
            <Navbar />
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer with logo and links */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton onClick={handleDrawerClose} sx={{ justifyContent: "end " }}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>

        <Box className="drawer-header">
          <img
            src={logo}
            alt="Logo"
            className="drawer-logo"
            style={{
              width: "50%", // Adjust width
              height: "130%", // Adjust height
              borderRadius: "8px",
              marginTop: "-30px", // Optional: to give it a rounded corner
            }}
          />
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/todolist?search=">
              <ListItemText primary="TodoList" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/setting">
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main content area */}
      <Box component="main" className={`main-content ${open ? "open" : ""}`}>
        {/* Spacing for the drawer header */}
        <Box sx={{ ...theme.mixins.toolbar }} />
        <Outlet /> {/* Render current route content */}
      </Box>
    </Box>
  );
};

export default Layout;
