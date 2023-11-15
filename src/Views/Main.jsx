import React, { useState } from "react";
import StartForm from "./StartForm";
import FlightSelect from "./FlightSelect";
import CurrentRoute from "./CurrentRoute";
import Summary from "./Summary";
import Itineraries from "./Itineraries";
import Map from "./Map";
import Layout from "../Components/Layout";

let mockStartFlight = [];

// mockStartFlight = [
//   {
//     outbound: {
//       departureAirport: {
//         iataCode: "WAW",
//         name: "WAW",
//         city: {
//           name: "Home",
//         },
//       },
//       arrivalAirport: {
//         iataCode: "WAW",
//         name: "WAW",
//         countryName: "Poland",
//         city: {
//           name: "Home",
//         },
//       },
//       departureDate: "2023-11-05T01:00:00",
//       arrivalDate: "2023-11-05T01:00:00",
//     },
//   },
// ];

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
  const departureAirport = lastFlight.outbound.arrivalAirport;

  return (
    <div data-testid="area-main">
      <Layout>
        <Layout.Header>
          <div data-testid="area-timeline">
            <CurrentRoute flights={flights} deleteFlight={deleteFlight} />
          </div>
          {/* <button onClick={() => prompt("Name")}>TODO: Save</button> */}
        </Layout.Header>
        <Layout.Row>
          <Layout.Aside>
            <div data-testid="area-flightslist">
              <FlightSelect
                date={departureDate}
                origin={departureAirport}
                addFlight={addFlight}
              />
            </div>
          </Layout.Aside>
          <Layout.Content>
            <Map flights={flights} />
          </Layout.Content>
        </Layout.Row>
        <Layout.Footer>
          {/* <select>
          <option>TODO: reload previous</option>
        </select> */}
          <div data-testid="area-summary">
            <Summary flights={flights} />
          </div>
        </Layout.Footer>
      </Layout>
    </div>
  );
}
