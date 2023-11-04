import React, { useState } from "react";
import { parseJSON, add, format, setHours, setMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getOneWayFares } from "../api/ryanair";
import FlightList from "../Components/FlightList";

function FlightSelect({ date, origin, addFlight }) {
  const [dayOffset, setDayOffset] = useState(0);
  const parsedDate = parseJSON(date);

  let currentDate = parsedDate;
  // if days offset reset hour to 00

  if (dayOffset > 0) {
    currentDate = setHours(
      setMinutes(add(parsedDate, { days: dayOffset }), 0),
      0
    );
  }

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [
      "flights",
      {
        origin,
        date: format(currentDate, "y-MM-dd"),
        timeFrom: "00:00",
        timeTo: "23:59",
      },
    ],
    queryFn: getOneWayFares,
    staleTime: 120000,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div>
        Its {format(currentDate, "dd-MM-yyyy HH:mm")} (arrival plus {dayOffset}{" "}
        days), you are in {origin}
      </div>
      <div>
        <button
          disabled={dayOffset === 0}
          onClick={() => setDayOffset((d) => d - 1)}
        >
          Previous day
        </button>
        <button onClick={() => setDayOffset((d) => d + 1)}>Next day</button>
      </div>

      {isPending || isFetching ? (
        "Loading"
      ) : (
        <FlightList
          data={data ? data : { fares: [] }}
          currentDate={currentDate}
          onSelect={(flight) => {
            addFlight(flight);
            setDayOffset(0);
          }}
        />
      )}
    </div>
  );
}

export default FlightSelect;
