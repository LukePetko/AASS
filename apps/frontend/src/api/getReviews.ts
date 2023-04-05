import { User } from "../types";

export const getReviews = async (id: number | null) => {
  if (!id) {
    return null;
  }

  const response = await fetch(
    `http://localhost:3003/get-subordinates?id=${id}&vacation_filter=PENDING`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = (await response.json()) as User[];

  return data;
};
