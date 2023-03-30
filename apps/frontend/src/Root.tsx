import React from "react";
import { Link, Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default Root;
