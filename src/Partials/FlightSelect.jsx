import React, { useState, useEffect } from "react";
import { parseJSON, add, format, setHours, setMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getOneWayFares } from "../api/ryanair";
import FlightList from "./FlightList";
import DaySelector from "../Components/DaySelector";
import DepartureHeader from "../Components/DepartureHeader";

function FlightSelect({ date, origin, addFlight }) {
  const [dayOffset, setDayOffset] = useState(0);
  const parsedDate = parseJSON(date);

  let currentDate = parsedDate;
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
        origin: origin.iataCode,
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
    <div style={{ padding: "10px 10px" }}>
      <div data-testid="area-flightform">
        <DepartureHeader currentOrigin={origin} />
        <DaySelector
          arrivalDate={parsedDate}
          currentDate={currentDate}
          dayOffset={dayOffset}
          setDayOffset={setDayOffset}
        />
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
