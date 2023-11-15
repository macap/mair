/**
    **Title**: App initial state
    **Description**: Tests initial state of the main part - building route
    
    **Context**:
    User selected origin and departure date and submitted that on landing page. 
    They are moved to main view to build their route

    Criteria:
    - Origin and departure date provided by the user in the form are reflected on this page
    - There is a list of flights departing from origin to select

**/

import { render, screen, fireEvent, getByText } from "@testing-library/react";

import App from "../../src/App";

// screen.debug();

const getArea = {
  timeline: () => screen.getByTestId("area-timeline"),
  flightsForm: () => screen.getByTestId("area-flightform"),
};

describe("Main page initial state", () => {
  beforeEach(() => {
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
  });
  it("shows correct origin and date on timeline", () => {
    expect(getByText(getArea.timeline(), "WAW")).toBeTruthy();
    expect(getByText(getArea.timeline(), "Su, 10 Nov")).toBeTruthy();
  });
  it("shows correct arrival day on flightform", () => {
    const arrivalDayBox = getByText(getArea.flightsForm(), "arrival day", {
      exact: false,
    });
    // FIXME: replace with testid selector as this will probably fails at some point
    expect(arrivalDayBox.parentElement.textContent).toEqual(
      "arrival day10 NovSunday01:00"
    );
  });
  it("shows correct origin on flightslist", () => {
    const flightListElement = screen.getAllByTestId("element-flightlist")[0];

    expect(flightListElement.textContent).toContain("Warsaw Chopin (WAW)");
  });
});
