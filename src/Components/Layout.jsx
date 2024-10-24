import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
import "./Layout.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, closeDrawer } from "../Store/drawerSlice";
import { ThemeContext } from "../ThemeContext";

const drawerWidth = 240;

const Layout = () => {
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  // const isSmallDevices = useMediaQuery("(max-width:900px)");
  const isOpen = useSelector((state) => state.drawer.isOpen);

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Box className="layout">
      <CssBaseline />

      {/* AppBar with conditional class names */}
      <AppBar position="fixed" className={`app-bar ${isOpen ? "open" : ""}`}>
        <Toolbar sx={{ paddingRight: "15px !important" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(isOpen && { display: "none" }) }}
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
        open={isOpen}
      >
        {/* <IconButton onClick={handleDrawerClose} sx={{ justifyContent: "end" }}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton> */}
        <Box>
          <IconButton
            size="small"
            onClick={handleDrawerClose}
            sx={{
              float: "right",
              mr: 1,
              boxShadow: "0 0 10px 1px rgb(115 103 240 / 70%)",
              width: "40px",
              height: "40px",
              marginTop: "13px",
              background:
                theme.palette.mode === "dark"
                  ? "none" // No background in dark mode
                  : "linear-gradient(118deg, #7367F0, rgba(15, 123, 285, 17))",
            }}
          >
            {theme.direction === "ltr" ? (
              <MenuOpenIcon sx={{ color: "white" }} />
            ) : (
              <></>
            )}
          </IconButton>
        </Box>

        <Box className="drawer-header">
          <img
            src={logo}
            alt="Logo"
            className="drawer-logo"
            style={{
              width: "50%",
              height: "130%",
              borderRadius: "8px",
              marginTop: "-30px",
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
            <ListItemButton component={Link} to="/todolist">
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
      <Box component="main" className={`main-content ${isOpen ? "open" : ""}`}>
        <Box sx={{ ...theme.mixins.toolbar }} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
