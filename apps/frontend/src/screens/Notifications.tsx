import { useAtom } from "jotai";
import React from "react";
import { useQuery } from "react-query";
import { persistUserAtom } from "../atoms/atoms";

const getNotifications = async (id: number | null) => {
  if (!id) {
    return [];
  }

  const response = await fetch(
    `http://localhost:3004/get-notifications?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};

const seen = async (id: number) => {
  const response = await fetch(`http://localhost:3004/seen?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

const Notifications = () => {
  const [userId] = useAtom(persistUserAtom);

  const { data, refetch } = useQuery("notifications", () =>
    getNotifications(userId)
  );

  const handleSeen = async (id: number) => {
    await seen(id);
    refetch();
  };

  return (
    <div>
      <h1>Notifications</h1>
      {data &&
        data.map((notification: any) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
            <button onClick={() => handleSeen(notification.id)}>Seen</button>
          </div>
        ))}

      {!data && <p>No notifications</p>}

      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default Notifications;
