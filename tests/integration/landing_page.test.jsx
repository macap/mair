/**
    **Title**: Landing page
    **Description**: Test first step - origin/departure form
    
    **Context**:
    User entered the app

    Criteria:
    - There are fields for origin (select) and departure date and submit button/
    - After submitssion users are moved to main view to build their route
**/

import { render, screen, fireEvent, getByText } from "@testing-library/react";

import { App } from "../../src/App";
import { renderWithProviders } from "../setup";

describe("Landing page", () => {
  it("renders main form and shows main area after submitting the form", () => {
    renderWithProviders(<App />);

    // find form elements:
    const originSelect = screen.getByPlaceholderText("Departure airport");
    const dateSelect = screen.getByLabelText("Departure date");
    const submitButton = screen.getByTestId("submit-departure-form");

    // select WAW as aiport and 10.11.2024 as date:
    fireEvent.change(originSelect, { target: { value: "Chopin" } });
    fireEvent.keyDown(originSelect, { key: "ArrowDown", code: 40 });
    fireEvent.keyDown(originSelect, { key: "Enter", code: 13 });
    expect(originSelect.value).toBe("Warsaw Chopin");

    fireEvent.change(dateSelect, { target: { value: "2024-11-10" } });

    // submit form
    fireEvent.click(submitButton);

    expect(screen.getByTestId("area-main")).toBeTruthy();
  });
});
