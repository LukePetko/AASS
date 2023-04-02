import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/Login";

const router = createBrowserRouter([
  {
    path: "/register",
  },
  {
    path: "/",
    element: <Login />,
  },
]);

export default router;
