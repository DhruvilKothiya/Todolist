// src/Routes.js
import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Home";
// import TokenPage from "./TokenPage";
import About from "./About";
import TodoList from "./TodoList"; // Import TodoList component
import Layout from "./Layout";
import Title from "./Title";
import Dashbord from "./Dashbord";
import Setting from "./Setting";
import Token from "./Token";
import Profile from "./Profile";
import NotfoundPage from "./NotfoundPage";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        // { path: "/tokenpage/:token", element: <TokenPage /> },
        { path: "/token/:token", element: <Token /> },
        { path: "/todolist", element: <TodoList /> },
        { path: "/dashboard", element: <Dashbord /> },
        { path: "/todolist/:id", element: <Title /> },
        { path: "/setting", element: <Setting /> },
        { path: "/profile", element: <Profile /> },
        { path: "*", element: <NotfoundPage /> },
      ],
    },
  
  ]);



  return routes;
};

export default AppRoutes;
