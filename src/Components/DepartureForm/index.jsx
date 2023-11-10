import { useState } from "react";
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
        />
      </div>
      <button
        className={css.button}
        disabled={!departureDate || !departureAirport}
        onClick={() => onSubmit(departureAirport, departureDate)}
      >
        Search
      </button>
    </div>
  );
}

export default DepartureForm;
