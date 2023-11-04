import React from "react";
import { parseJSON, formatDistance } from "date-fns";
import FlightTimeline from "../Components/FlightTimeline";

function durationInCity(arrivalString, departureString) {
  const arr = parseJSON(arrivalString);
  const dep = parseJSON(departureString);

  return formatDistance(arr, dep);
}

function CurrentRoute({ flights, deleteFlight }) {
  return <FlightTimeline flights={flights} deleteFlight={deleteFlight} />;
}

export default CurrentRoute;
