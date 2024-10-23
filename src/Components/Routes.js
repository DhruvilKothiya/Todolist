import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import TodoList from "./TodoList";
import Layout from "./Layout";
import Title from "./Title";
import Dashboard from "./Dashbord";
import Setting from "./Setting";
import Token from "./Token";
import NotfoundPage from "./NotfoundPage";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import RegisterPage from "./RegisterPage";

// Protected Route Wrapper
const ProtectedRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/login" />;
};

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
        { path: "/dashboard", element: <Dashboard/> },
        { path: "/todolist/:id", element: <Title /> },
        { path: "/setting", element: <Setting /> },
        { path: "/profile", element: <Profile /> },
        { path: '/login',element:<LoginPage/>},
        { path: "*", element: <NotfoundPage /> },
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
