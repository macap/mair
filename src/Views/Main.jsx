import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFlight, removeFlight } from "../store/selectedFlights";
import StartForm from "./Start";
import FlightSelect from "../Partials/FlightSelect";
import Summary from "../Partials/Summary";
import Map from "../Partials/Map";
import Layout from "../Components/Layout";
import FlightTimeline from "../Components/FlightTimeline";
import { createSelector } from "@reduxjs/toolkit";

const selectFlightsListEmpty = createSelector(
  (state) => state.selectedFlights,
  (flights) => flights.length === 0
);

export default function App() {
  const isFlightsListEmpty = useSelector(selectFlightsListEmpty);

  if (isFlightsListEmpty) {
    return <StartForm />;
  }

  return (
    <div data-testid="area-main">
      <Layout>
        <Layout.Header>
          <div data-testid="area-timeline">
            <FlightTimeline />
          </div>
        </Layout.Header>
        <Layout.Row>
          <Layout.Aside>
            <div data-testid="area-flightslist">
              <FlightSelect />
            </div>
          </Layout.Aside>
          <Layout.Content>
            <Map />
          </Layout.Content>
        </Layout.Row>
        <Layout.Footer>
          <div data-testid="area-summary" style={{ width: "100%" }}>
            <Summary />
          </div>
        </Layout.Footer>
      </Layout>
    </div>
  );
}
