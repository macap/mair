import React, { useState } from "react";
import StartForm from "./StartForm";
import FlightSelect from "./FlightSelect";
import CurrentRoute from "./CurrentRoute";
import Summary from "./Summary";
import Itineraries from "./Itineraries";
import Map from "./Map";

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

mockStartFlight = [];

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
      <CurrentRoute flights={flights} deleteFlight={deleteFlight} />
      <Itineraries flights={flights} setFlights={setFlights} />
      <Summary flights={flights} />

      <div style={{ display: "flex" }}>
        <FlightSelect
          date={departureDate}
          origin={departureAirport}
          addFlight={addFlight}
        />
        <div style={{ width: "calc(100vw - 500px)" }}>
          <Map flights={flights} />
        </div>
      </div>
    </div>
  );
}
