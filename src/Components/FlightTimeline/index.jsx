import {
  parseJSON,
  formatDistanceStrict,
  addDays,
  differenceInCalendarDays,
  format,
} from "date-fns";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { removeFlight, clearFlights } from "../../store/selectedFlights";

import PlaneIcon from "../../assets/icons/plane.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import TrashIcon from "../../assets/icons/xmark.svg?react";

import css from "./FlightTimeline.module.scss";

const mapData = (f) => ({
  key: `${f.outbound.arrivalAirport.iataCode}${el.outbound.departureDate}`,
  airport: f.outbound.arrivalAirport.iataCode,
});

function durationInCity(arrivalString, departureString) {
  const arr = parseJSON(arrivalString);
  const dep = parseJSON(departureString);

  return formatDistanceStrict(arr, dep);
}

function FlightTooltip({ flight: f }) {
  return (
    <div className={css.tooltip}>
      <div>
        {f.outbound.arrivalAirport.name} ({f.outbound.arrivalAirport.iataCode}),{" "}
        {f.outbound.arrivalAirport.countryName}
      </div>
      <div>Departure: {f.outbound.departureDate}</div>
      <div>Arrival: {f.outbound.arrivalDate}</div>
      <div>
        {f.summary.price.value} {f.summary.price.currencySymbol}
      </div>
    </div>
  );
}

export function FlightTimeline() {
  const flights = useSelector((state) => state.selectedFlights);
  const dispatch = useDispatch();

  if (!flights.length) return null;
  if (flights.length === 1) {
    // only departure city set:
    return (
      <div className={css.timeline}>
        <div className={css.delete}>
          <button
            title="Delete flight"
            onClick={() => dispatch(clearFlights())}
          >
            {"back"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={css.timeline}>
      {flights.slice(1).map((f, i) => (
        <div className={css.element} key={f.id}>
          <div className={css.date}>
            {format(parseJSON(f.outbound.departureDate), "d MMM, EEEEEE")}
          </div>
          <div className={css.vertWrapper}>
            <div className={cx(css.box, css.flight)}>
              <PlaneIcon className={css.flightIcon} />
              <div>
                <div className={css.vertWrapper}>
                  <div className={css.flightTime}>
                    {format(parseJSON(f.outbound.departureDate), "HH:MM")}
                  </div>
                  <div className={css.airportCode}>
                    {f.outbound.departureAirport.iataCode}
                  </div>
                </div>
                <div className={css.vertWrapper}>
                  <div className={css.flightTime}>
                    {format(parseJSON(f.outbound.arrivalDate), "HH:MM")}
                  </div>
                  <div className={css.airportCode}>
                    {f.outbound.arrivalAirport.iataCode}
                  </div>
                </div>
              </div>
            </div>
            {i + 2 < flights.length ? (
              <div className={cx(css.box, css.duration)}>
                <ClockIcon className={css.durationIcon} />

                <div>
                  {durationInCity(
                    f.outbound.arrivalDate,
                    flights[i + 2].outbound.departureDate
                  )}
                </div>
              </div>
            ) : (
              <div className={css.delete}>
                <button
                  title="Delete flight"
                  onClick={() => dispatch(removeFlight(f.id))}
                >
                  <TrashIcon />
                </button>
              </div>
            )}
          </div>

          <FlightTooltip flight={f} />
        </div>
      ))}
    </div>
  );
}

export default FlightTimeline;
