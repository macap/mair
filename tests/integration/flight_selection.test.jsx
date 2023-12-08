/**
    **Title**: Flight selection
    **Description**: Tests main part of the app - creating route
    
    **Context**:
    User selected origin and departure date and submitted that on landing page. 
    They are moved to main view to build their route

    Criteria:
    - There is a list of flights to select
    - Selecting flight sets its arrival airport as current and reloads the list of flights to select
    - There is a button to increase/decrease amount of days spent in current location
    - There is a button to remove previously selected flights
    - If there are no previously selected flights there is a button to go back to landing page (origin form)

**/

import {
  render,
  screen,
  fireEvent,
  getByText,
  getAllByTestId,
  waitFor,
} from "@testing-library/react";

import { App } from "../../src/App";
import { renderWithProviders } from "../setup";

const getArea = {
  timeline: () => screen.getByTestId("area-timeline"),
  flightsForm: () => screen.getByTestId("area-flightform"),
  flightsList: () => screen.getByTestId("area-flightslist"),
  summary: () => screen.getByTestId("area-summary"),
};

describe("Flight selection", () => {
  beforeEach(() => {
    renderWithProviders(<App />);
    // submit origin form:
    // select WAW as aiport and 10.11.2024 as date:
    const originSelect = screen.getByPlaceholderText("Departure airport");
    fireEvent.focus(originSelect);
    fireEvent.keyDown(originSelect, { key: "ArrowDown", code: 40 });
    fireEvent.keyDown(originSelect, { key: "Enter", code: 13 });

    fireEvent.change(screen.getByLabelText("Departure date"), {
      target: { value: "2024-11-10" },
    });
    // submit form
    fireEvent.click(screen.getByTestId("submit-departure-form"));
  });

  it("allows user to select a flight and updates the ui", async () => {
    const flightList = getArea.flightsList();

    // list has loading state:
    expect(screen.getByText("Loading")).toBeTruthy();

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    const flightListElement = getAllByTestId(
      flightList,
      "element-flightlist"
    )[0];

    fireEvent.click(flightListElement);

    // list is refreshing:
    expect(screen.getByText("Loading")).toBeTruthy();

    // 1. flight added to timeline
    expect(getByText(getArea.timeline(), "BRI")).toBeTruthy();
    //2. summary shown
    const summaryText = getArea.summary().textContent;
    expect(summaryText).toContain("1 flights");
    expect(summaryText).toContain("0 days");
    expect(summaryText).toContain("~14.99");
    expect(summaryText).toContain("(14.99");
    //TODO: 3. flight list updated with origin and some flights disabled

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    const flightListElement2 = getAllByTestId(
      flightList,
      "element-flightlist"
    )[4];

    expect(flightListElement2.textContent).toContain("Bari (BRI), Malta"); // mocked api always returns Malta as origin country :)
  });

  it("allows user to select arrival day", async () => {
    const nextDayButton = screen.getByTitle("Stay here for 1 more day");

    // click next day button three times, so length of stay should be 3 days
    fireEvent.click(nextDayButton);
    fireEvent.click(nextDayButton);

    fireEvent.click(nextDayButton);

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    const flightListElement = getAllByTestId(
      getArea.flightsList(),
      "element-flightlist"
    )[0];

    fireEvent.click(flightListElement);

    const summaryText = getArea.summary().textContent;
    expect(summaryText).toContain("1 flights");
    expect(summaryText).toContain("3 days");
  });

  it("allows user to remove flight from timeline", async () => {
    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    // add 2 flights to the list and validate summary
    let flightListElement = getAllByTestId(
      getArea.flightsList(),
      "element-flightlist"
    )[1]; // Catania (CTA), Italy

    fireEvent.click(flightListElement);

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    flightListElement = getAllByTestId(
      getArea.flightsList(),
      "element-flightlist"
    )[0]; // Bari (BRI), Italy

    fireEvent.click(flightListElement);

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    // Confirm BRI (last destination as current)
    expect(
      getByText(getArea.flightsForm(), "Bari (BRI), Italy", {
        exact: false,
      })
    ).toBeTruthy();
    // Confirm we have 2 flights:
    expect(getArea.summary().textContent).toContain("2 flights");

    const deleteFlightButton = screen.getByTitle("Delete flight");

    // click delete button on last flight
    fireEvent.click(deleteFlightButton);

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    // Confirm CTA (last destination as current)
    expect(
      getByText(getArea.flightsForm(), "Catania (CTA), Italy", {
        exact: false,
      })
    ).toBeTruthy();
    // Confirm we have 2 flights:
    expect(getArea.summary().textContent).toContain("1 flights");
  });

  it("allows user to go back to origin form", () => {
    /// clicking X on timeline next to origin should direct user to origin form

    // 1. origin form is not visible
    expect(screen.queryByTestId("submit-departure-form")).toBeNull();

    const deleteFlightButton = screen.getByTitle("Delete flight");

    // click delete button on last flight
    fireEvent.click(deleteFlightButton);

    expect(screen.queryByTestId("submit-departure-form")).toBeTruthy();
  });
});
