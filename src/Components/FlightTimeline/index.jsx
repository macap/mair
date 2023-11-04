import { parseJSON, formatDistance } from "date-fns";
import css from "./FlightTimeline.module.scss";

const mapData = (f) => ({
  key: `${f.outbound.arrivalAirport.iataCode}${el.outbound.departureDate}`,
  airport: f.outbound.arrivalAirport.iataCode,
});

function durationInCity(arrivalString, departureString) {
  const arr = parseJSON(arrivalString);
  const dep = parseJSON(departureString);

  return formatDistance(arr, dep);
}

function FlightTimeline({ flights, deleteFlight }) {
  if (!flights.length) return null;
  const startDate = flights[0].outbound.departureDate;
  const endDate = flights[flights.length - 1].outbound.arrivalDate;

  return (
    <div className={css.timeline}>
      {flights.map((f, i) => (
        <>
          <div className={css.element}>
            {f.outbound.arrivalAirport.iataCode}
            {i === flights.length - 1 ? (
              <div className={css.delete}>
                <button onClick={() => deleteFlight(i)}>{"❌"}</button>
              </div>
            ) : null}
            <div className={css.tooltip}>
              <div>
                {f.outbound.arrivalAirport.name} (
                {f.outbound.arrivalAirport.iataCode}),{" "}
                {f.outbound.arrivalAirport.countryName}
              </div>
              <div>Departure: {f.outbound.departureDate}</div>
              <div>Arrival: {f.outbound.arrivalDate}</div>
              {f.summary && f.summary.price ? (
                <div>
                  {f.summary.price.value} {f.summary.price.currencySymbol}
                </div>
              ) : null}
            </div>
          </div>
          {i + 1 < flights.length ? (
            <div className={css.duration}>
              {durationInCity(
                f.outbound.arrivalDate,
                flights[i + 1].outbound.departureDate
              )}
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
}

export default FlightTimeline;
