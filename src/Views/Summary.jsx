import React from "react";

function Summary({ flights }) {
  if (flights.length < 2) return null;

  return (
    <>
      <div>Summary</div>
      <div>
        Total price:{" "}
        {flights
          .slice(1)
          .map(
            (e) => `${e.summary.price.value}${e.summary.price.currencySymbol}`
          )
          .join(" + ")}{" "}
      </div>
      <div>
        Dates: {flights[0].outbound.departureDate} -{" "}
        {flights[flights.length - 1].outbound.arrivalDate} ({`${0} days`})
      </div>
    </>
  );
}

export default Summary;
