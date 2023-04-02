import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import loginRouter from "./routes/loginRouter";
import Dashboard from "./screens/Dashboard";
import contentRouter from "./routes/contentRouter";

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <>
      {userId ? (
        <RouterProvider router={contentRouter} />
      ) : (
        <RouterProvider router={loginRouter} />
      )}
    </>
  );
}

export default App;
