import { useAtom } from "jotai";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import getMe from "../api/getMe";
import { persistUserAtom } from "../atoms/atoms";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Vacation } from "../types";
import { calcBusinessDays } from "../utils";

const NewHoliday = () => {
  const [userId] = useAtom(persistUserAtom);

  const noteRef = useRef<HTMLInputElement>(null);

  const handleSelect = (ranges: any) => {
    selectionRange.startDate = ranges.selection.startDate;
    selectionRange.endDate = ranges.selection.endDate;
  };

  const handleSubmit = async () => {
    console.log(selectionRange.startDate.toISOString(), noteRef.current?.value);
    console.log(
      calcBusinessDays(selectionRange.startDate, selectionRange.endDate)
    );

    const response = await fetch(`http://localhost:3002/request-vacation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        start: selectionRange.startDate,
        end: selectionRange.endDate,
        note: noteRef.current?.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const vacation = (await response.json()) as Vacation;

    window.location.href = "/";

    return vacation;
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    minDate: Date.now(),
    color: "#8888FC",
    key: "selection",
  };

  const { data, isLoading } = useQuery("me", () => getMe(userId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.isTeamLeader) {
    return <div>Nemôžete zadávať dovolenky ako teamLeader</div>;
  }

  return (
    <div className="flex flex-col max-w-2xl">
      <h1>Nová dovolenka</h1>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <div>
        <label htmlFor="note">Poznámka</label>
        <input ref={noteRef} id="note" type="text" />
      </div>
      <button
        className="text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={handleSubmit}
      >
        Zadať
      </button>
      <p>
        <Link to="/">dashboard</Link>
      </p>
    </div>
  );
};

export default NewHoliday;
