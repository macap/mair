import { useState } from "react";
import cx from "classnames";
import css from "./DepartureForm.module.scss";

import airports from "../../data/airports.json";
import { format } from "date-fns";

const airportsList = Object.keys(airports).map((key) => ({
  value: key,
  label: airports[key],
}));

function DepartureForm({ onSubmit }) {
  const [departureDate, setDepartureDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [departureAirport, setDepartureAirport] = useState("WMI");

  return (
    <div className={css.form}>
      <div className={css.formField}>
        <label htmlFor="origin">Origin</label>
        <select
          id="origin"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
          className={cx(css.select, css.input__rounded_left)}
        >
          {airportsList.map((airport) => (
            <option key={airport.value} value={airport.value}>
              {airport.label}
            </option>
          ))}
        </select>
      </div>
      <div className={css.formField}>
        <label htmlFor="date">Departure date</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDepartureDate(e.target.value)}
          value={departureDate}
          className={css.input}
        />
      </div>
      <button
        className={cx(css.button, css.rounded_right)}
        disabled={!departureDate || !departureAirport}
        onClick={() => onSubmit(departureAirport, departureDate)}
        data-testid="submit-departure-form"
      >
        Plan your journey
      </button>
    </div>
  );
}

export default DepartureForm;
