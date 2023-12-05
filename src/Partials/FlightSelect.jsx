import React, { useState, useEffect } from "react";
import { parseJSON, add, format, setHours, setMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addFlight } from "../store/selectedFlights";
import { getOneWayFares } from "../api/ryanair";
import FlightList from "./FlightList";
import DaySelector from "../Components/DaySelector";
import DepartureHeader from "../Components/DepartureHeader";

export function FlightSelect({ date, origin, addFlight }) {
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

function ConnectedFlightSelect() {
  const flights = useSelector((state) => state.selectedFlights);
  const dispatch = useDispatch();

  const addFlight2 = (flight) => {
    dispatch(addFlight(flight));
  };

  const lastFlight = flights[flights.length - 1];
  const departureDate = lastFlight.outbound.arrivalDate;
  const departureAirport = lastFlight.outbound.arrivalAirport;

  return (
    <FlightSelect
      date={departureDate}
      origin={departureAirport}
      addFlight={addFlight2}
    />
  );
}

export default ConnectedFlightSelect;
