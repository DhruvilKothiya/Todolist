// src/Routes.js
import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Home";
import TokenPage from "./TokenPage";
import About from "./About";
import TodoList from "./TodoList"; // Import TodoList component
import Layout from "./Layout";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/tokenpage/:token", element: <TokenPage /> },
        { path: "/todolist", element: <TodoList /> }, // Add route for TodoList
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
