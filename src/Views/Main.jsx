import React, { useState } from "react";
import StartForm from "./StartForm";
import FlightSelect from "./FlightSelect";
import CurrentRoute from "./CurrentRoute";
import Summary from "./Summary";
import Itineraries from "./Itineraries";

let mockStartFlight = [];

mockStartFlight = [
  {
    outbound: {
      departureAirport: {
        iataCode: "WAW",
        name: "WAW",
        city: {
          name: "Home",
        },
      },
      arrivalAirport: {
        iataCode: "WAW",
        name: "WAW",
        city: {
          name: "Home",
        },
      },
      departureDate: "2023-11-05T01:00:00",
      arrivalDate: "2023-11-05T01:00:00",
    },
  },
];

// mockStartFlight = [];

export default function App() {
  const [flights, setFlights] = useState([...mockStartFlight]);

  const addFlight = (flight) => {
    setFlights([...flights, flight]);
  };

  const deleteFlight = (index) => {
    setFlights((f) => f.filter((_, i) => i !== index));
  };

  if (flights.length === 0) {
    return <StartForm addFlight={addFlight} />;
  }

  const lastFlight = flights[flights.length - 1];
  const departureDate = lastFlight.outbound.arrivalDate;
  const departureAirport = lastFlight.outbound.arrivalAirport.iataCode;

  return (
    <div>
      <Itineraries flights={flights} setFlights={setFlights} />
      <CurrentRoute flights={flights} deleteFlight={deleteFlight} />
      <Summary flights={flights} />

      <FlightSelect
        date={departureDate}
        origin={departureAirport}
        addFlight={addFlight}
      />
    </div>
  );
}
