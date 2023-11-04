import {
  parseJSON,
  formatDistance,
  addDays,
  differenceInCalendarDays,
  format,
} from "date-fns";
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
  const startDate = parseJSON(flights[0].outbound.departureDate);
  const endDate = parseJSON(flights[flights.length - 1].outbound.arrivalDate);

  let currDate = startDate;

  return (
    <div className={css.timeline}>
      <div className={css.date}>{format(startDate, "EEEEEE, d MMM")}</div>
      {flights.map((f, i) => (
        <>
          <div className={css.element}>
            {differenceInCalendarDays(
              parseJSON(f.outbound.departureDate),
              currDate
            ) > 0
              ? (() => {
                  currDate = parseJSON(f.outbound.departureDate);
                  return (
                    <div className={css.date}>
                      {format(currDate, "EEEEEE, d MMM")}
                    </div>
                  );
                })()
              : null}
            {f.outbound.arrivalAirport.iataCode}
            {i === flights.length - 1 ? (
              <div className={css.delete}>
                <button onClick={() => deleteFlight(i)}>{"❌"}</button>
              </div>
            ) : null}
            {i > 0 ? (
              <div className={css.tooltip}>
                <div>
                  {f.outbound.arrivalAirport.name} (
                  {f.outbound.arrivalAirport.iataCode}),{" "}
                  {f.outbound.arrivalAirport.countryName}
                </div>
                <div>Departure: {f.outbound.departureDate}</div>
                <div>Arrival: {f.outbound.arrivalDate}</div>
                <div>
                  {f.summary.price.value} {f.summary.price.currencySymbol}
                </div>
              </div>
            ) : null}
          </div>

          {i > 0 && i + 1 < flights.length ? (
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
