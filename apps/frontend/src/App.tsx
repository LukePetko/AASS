import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import loginRouter from "./routes/loginRouter";
import contentRouter from "./routes/contentRouter";
import Navbar from "./components/Navbar";
import { useAtom } from "jotai";
import { persistUserAtom } from "./atoms/atoms";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [userId] = useAtom(persistUserAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {userId ? (
        <RouterProvider router={contentRouter} />
      ) : (
        <RouterProvider router={loginRouter} />
      )}
    </QueryClientProvider>
  );
}

export default App;
