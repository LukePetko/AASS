import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import getMe from "../api/getMe";
import { persistUserAtom } from "../atoms/atoms";

const Dashboard = () => {
  const [userId] = useAtom(persistUserAtom);

  const { data } = useQuery("me", () => getMe(userId));

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
      {data && !data.teamLeader && (
        <p>
          <Link to="/review">review</Link>
        </p>
      )}
      <p>
        <Link to="/new-holiday">new holiday</Link>
      </p>
    </div>
  );
};

export default Dashboard;
