import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import NewHoliday from "../screens/NewHoliday";
import Notifications from "../screens/Notifications";
import Review from "../screens/Review";

const router = createBrowserRouter([
  {
    path: "/new-holiday",
    element: <NewHoliday />,
  },
  { path: "/review", element: <Review /> },
  { path: "/notifications", element: <Notifications /> },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;
