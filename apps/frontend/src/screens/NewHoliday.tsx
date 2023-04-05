import React from "react";
import { Link } from "react-router-dom";

const NewHoliday = () => {
  return (
    <div>
      <h1>New Holiday</h1>
      <p>
        <Link to="/">dashboard</Link>
      </p>
    </div>
  );
};

export default NewHoliday;
