import React, { useState } from "react";
import StartForm from "./Start";
import FlightSelect from "../Partials/FlightSelect";
import Summary from "../Partials/Summary";
import Map from "../Partials/Map";
import Layout from "../Components/Layout";
import FlightTimeline from "../Components/FlightTimeline";

export default function App() {
  const [flights, setFlights] = useState([]);

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
            <FlightTimeline flights={flights} deleteFlight={deleteFlight} />
          </div>
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
          <div data-testid="area-summary" style={{ width: "100%" }}>
            <Summary flights={flights} />
          </div>
        </Layout.Footer>
      </Layout>
    </div>
  );
}
