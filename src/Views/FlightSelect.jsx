import React, { useState } from "react";
import { parseJSON, add, format } from "date-fns";
import ExpandableList from "../Components/ExpandableList";

//https://www.ryanair.com/api/view"https://www.ryanair.com/api/farfnd/v4/oneWayFares?departureAirportIataCode=WAW&outboundDepartureDateFrom=2023-11-11&market=en-ie&adultPaxCount=1&outboundDepartureDateTo=2023-11-11&outboundDepartureTimeFrom=00:00&outboundDepartureTimeTo=23:59"

function FlightList({ data, onSelect }) {
  return (
    <div>
      <div>Next flight:</div>

      <ul>
        <ExpandableList>
          {data.fares.map((el) => (
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
          ))}
        </ExpandableList>
      </ul>
    </div>
  );
}

function FlightSelect({ date, origin, addFlight }) {
  const [dayOffset, setDayOffset] = useState(0);

  const parsedDate = parseJSON(date);

  return (
    <div>
      <h1>Select flight</h1>
      <div>
        Its {format(add(parsedDate, { days: dayOffset }), "dd-MM-yyyy")}{" "}
        (arrival plus {dayOffset} days), you are in {origin}
      </div>
      <div>
        <button
          disabled={dayOffset === 0}
          onClick={() => setDayOffset((d) => d - 1)}
        >
          Previous day
        </button>
        <button onClick={() => setDayOffset((d) => d + 1)}>Next day</button>
      </div>

      <FlightList
        data={{ fares: [] }}
        onSelect={(flight) => {
          addFlight(flight);
          setDayOffset(0);
        }}
      />
    </div>
  );
}

export default FlightSelect;
