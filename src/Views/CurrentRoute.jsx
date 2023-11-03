import React from "react";
import { parseJSON, formatDistance } from "date-fns";

function durationInCity(arrivalString, departureString) {
  const arr = parseJSON(arrivalString);
  const dep = parseJSON(departureString);

  return formatDistance(arr, dep);
}

function CurrentRoute({ flights }) {
  return (
    <div>
      <h2>Flights so far: {flights.length - 1}</h2>
      <ul>
        {flights.slice(1).map((el, i) => (
          <>
            <li key={el.outbound.arrivalAirport.iataCode}>
              <div>
                <a href="#" onClick={() => onSelect(el)}>
                  {el.outbound.arrivalAirport.name} (
                  {el.outbound.arrivalAirport.iataCode}),{" "}
                  {el.outbound.arrivalAirport.countryName}
                </a>
                , {el.summary.price.value} {el.summary.price.currencySymbol}
              </div>
              <div>
                {el.outbound.departureDate} - {el.outbound.arrivalDate}
              </div>
            </li>
            {i + 2 < flights.length ? (
              <li>
                {durationInCity(
                  el.outbound.arrivalDate,
                  flights[i + 1].outbound.departureDate
                )}
              </li>
            ) : null}
          </>
        ))}
      </ul>
    </div>
  );
}

export default CurrentRoute;
