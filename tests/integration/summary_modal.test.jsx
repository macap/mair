/**
    **Title**: Summary modal
    **Description**: Final part of creating route - list of selected flights with a link to book
    
    **Context**:
    User selected flights to build the route. They are ready to proceed with booking.
    The process starts with clicking CTA in summary area

    Criteria:
    - Modal with list of flights should open
    - There should be a link to booking site for each flight
    - There should be close button in modal
**/

import {
  render,
  screen,
  fireEvent,
  getByText,
  getAllByTestId,
  getAllByText,
  waitFor,
} from "@testing-library/react";

import App from "../../src/App";

const getArea = {
  timeline: () => screen.getByTestId("area-timeline"),
  flightsForm: () => screen.getByTestId("area-flightform"),
  flightsList: () => screen.getByTestId("area-flightslist"),
  summary: () => screen.getByTestId("area-summary"),
  flightsModal: () => screen.getByTestId("area-flightsmodal"),
};

describe("Summary modal", () => {
  beforeEach(async () => {
    render(<App />);
    // submit origin form:
    // select WAW as aiport and 10.11.2024 as date:
    fireEvent.change(screen.getByLabelText("Origin"), {
      target: { value: "WAW" },
    });
    fireEvent.change(screen.getByLabelText("Departure date"), {
      target: { value: "2024-11-10" },
    });
    // submit form
    fireEvent.click(screen.getByTestId("submit-departure-form"));

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    // select  flight
    let flightListElement = getAllByTestId(
      getArea.flightsList(),
      "element-flightlist"
    )[1]; // Catania (CTA), Italy

    fireEvent.click(flightListElement);

    // wait for results to load:
    await waitFor(() => screen.getAllByTestId("element-flightlist"));

    // select  flight
    flightListElement = getAllByTestId(
      getArea.flightsList(),
      "element-flightlist"
    )[0]; // Bari (BRI), Italy

    fireEvent.click(flightListElement);

    // open modal (click summary CTA)
    fireEvent.click(screen.getByText("Book flights"));
  });

  it("shows flight list with booking cta", () => {
    expect(getArea.summary().textContent).toContain("2 flights");
    expect(getArea.flightsModal()).toBeTruthy();

    const selectedFlights = getAllByTestId(
      getArea.flightsModal(),
      "element-flightlist"
    );

    const selectedFlightsBookLinks = getAllByText(
      getArea.flightsModal(),
      "Book on ryanair.com"
    );

    // first flight to catania:

    expect(selectedFlights[0].textContent).toContain("Catania (CTA), Italy");

    expect(selectedFlightsBookLinks[0].href).toContain("&originIata=WAW"); // first flight so the origin is WAW
    expect(selectedFlightsBookLinks[0].href).toContain("&dateOut=2024-11-10"); // first flight
    expect(selectedFlightsBookLinks[0].href).toContain("destinationIata=CTA");

    // 2nd flight to BRI:
    expect(selectedFlights[1].textContent).toContain("Bari (BRI), Italy");

    expect(selectedFlightsBookLinks[1].href).toContain("&originIata=CTA"); // 2nd flight so the origin is CTA
    expect(selectedFlightsBookLinks[1].href).toContain("&dateOut=2024-11-10");
    expect(selectedFlightsBookLinks[1].href).toContain("destinationIata=BRI");
  });

  it("closes modal on close button", () => {
    expect(getArea.flightsModal()).toBeTruthy();

    const closeButton = screen.getByTitle("Close modal");

    fireEvent.click(closeButton);

    expect(screen.queryByTestId("area-flightsmodal")).toBeNull();
  });
});
