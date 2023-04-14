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
    <div className="m-5">
      {data && data.isTeamLeader && (
        <p className="text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5">
          <Link to="/review">Zamestanci</Link>
        </p>
      )}
      {data && !data.isTeamLeader && (
        <p className="w-auto text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5">
          <Link to="/new-holiday">Zadávanie dovolenky</Link>
        </p>
      )}
      <p className="my-2 w-auto text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5">
        <Link to="/notifications">Notifikácie</Link>
      </p>
    </div>
  );
};

export default Dashboard;
