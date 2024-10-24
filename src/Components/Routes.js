import React, { Profiler } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import TodoList from "./TodoList";
import Layout from "./Layout";
import Title from "./Title";
import Dashbord from "./Dashbord";
import Setting from "./Setting";
import Token from "./Token";
import NotfoundPage from "./NotfoundPage";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import RegisterPage from "./RegisterPage";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ auth, element }) => {
  return auth ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  // const auth = localStorage.getItem("token"); // Check for authentication token
  // console.log("auth", auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // Helper function to handle protected routes

  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> }, // Public Route
        { path: "*", element: <NotfoundPage /> }, // Catch all other routes
        { path: "/about", element: <About /> },
        {
          path: "/todolist",
          element: <ProtectedRoute auth={isLoggedIn} element={<TodoList />} />,
        }, // Protected Route
        {
          path: "/dashboard",
          element: <ProtectedRoute auth={isLoggedIn} element={<Dashbord />} />,
        }, // Protected Route
        {
          path: "/todolist/:id",
          element: <ProtectedRoute auth={isLoggedIn} element={<Title />} />,
        }, // Protected Route
        {
          path: "/setting",
          element: <ProtectedRoute auth={isLoggedIn} element={<Setting />} />,
        },
        {
          path: "/profile",
          element: <ProtectedRoute auth={isLoggedIn} element={<Profile />} />,
        }, // Protected Route
        // Protected Route
        {
          path: "/token/:token",
          element: <ProtectedRoute auth={isLoggedIn } element={<Token />} />,
        }, // Protected Route
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
