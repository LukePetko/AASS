import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import NewHoliday from "../screens/NewHoliday";
import Review from "../screens/Review";

const router = createBrowserRouter([
  {
    path: "/new-holiday",
    element: <NewHoliday />,
  },
  { path: "/review", element: <Review /> },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;
