import { User } from "../types";

const getMe = async (id: number | null) => {
  if (!id) {
    return null;
  }

  const response = await fetch(`http://localhost:3001/me?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const user = (await response.json()) as User;

  return user;
};

export default getMe;
