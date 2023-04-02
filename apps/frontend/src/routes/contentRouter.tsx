import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../screens/Dashboard";

const router = createBrowserRouter([
  {
    path: "/register",
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;
