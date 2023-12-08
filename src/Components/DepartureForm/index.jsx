import { useState } from "react";
import cx from "classnames";
import { format } from "date-fns";

import css from "./DepartureForm.module.scss";
import AirportSelect from "../AirportSelect";

function DepartureForm({ onSubmit }) {
  const [departureDate, setDepartureDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [departureAirport, setDepartureAirport] = useState("WMI");

  return (
    <div className={css.form}>
      <div className={css.formField}>
        <AirportSelect
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
        />
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
        data-umami-event="Submit departure form"
        data-testid="submit-departure-form"
      >
        Plan your journey
      </button>
    </div>
  );
}

export default DepartureForm;
