import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getReviews } from "../api/getReviews";
import { persistUserAtom } from "../atoms/atoms";

const approveVacation = async (id: number) => {
  const response = await fetch(`http://localhost:3002/approve-vacation/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, action: "APPROVED" }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return await response.json();
};

const rejectVacation = async (id: number) => {
  const response = await fetch(`http://localhost:3002/approve-vacation/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, action: "REJECTED" }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return await response.json();
};

const Review = () => {
  const [userId] = useAtom(persistUserAtom);

  const { data, isLoading, refetch } = useQuery("reviews", () =>
    getReviews(userId)
  );

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const handleApprove = async (id: number) => {
    try {
      await approveVacation(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectVacation(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data && data.length === 0) {
    return <div>Nemáte prístup na úpravy na tejto stránke</div>;
  }

  return (
    <div>
      <h1>Review</h1>
      {data &&
        data.map((user) => (
          <div key={user.id} className="py-4">
            <p>
              {user.firstName} {user.lastName}
            </p>
            {user.Vacation.length === 0 && (
              <p>Žiadne dovolenky na schválenie</p>
            )}
            {user.Vacation.map((vacation) => (
              <div key={vacation.id}>
                <p>
                  {vacation.start} - {vacation.end}
                </p>
                <button
                  className="text-primary-900 bg-primary-300 hover:bg-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                  onClick={() => handleApprove(vacation.id)}
                >
                  schváliť
                </button>
                <button
                  className="text-primary-900 bg-primary-300 hover:bg-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                  onClick={() => handleReject(vacation.id)}
                >
                  zamietnuť
                </button>
              </div>
            ))}
          </div>
        ))}
      <p>
        <Link to="/">dashboard</Link>
      </p>
    </div>
  );
};

export default Review;
