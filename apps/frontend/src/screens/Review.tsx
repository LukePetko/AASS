import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getReviews } from "../api/getReviews";
import { persistUserAtom } from "../atoms/atoms";

const Review = () => {
  const [userId] = useAtom(persistUserAtom);

  const { data } = useQuery("reviews", () => getReviews(userId));

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <h1>Review</h1>
      {data && data.map((review) => (
        <div key={review.id}>
            {review && review.Vacation.length > 0 && (
                <div>
                    {review.firstName} {review.lastName}
                    </div>

            )}
        </div>
      )}
      <p>
        <Link to="/">dashboard</Link>
      </p>
    </div>
  );
};

export default Review;
