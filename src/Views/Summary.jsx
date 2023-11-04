import SummaryComponent from "../Components/Summary";

function Summary({ flights }) {
  if (flights.length < 2) return null;

  return (
    <SummaryComponent
      price={flights
        .slice(1)
        .map((e) => `${e.summary.price.value}${e.summary.price.currencySymbol}`)
        .join(" + ")}
      currency={""}
      startDate={flights[0].outbound.departureDate}
      endDate={flights[flights.length - 1].outbound.arrivalDate}
      daysCount={"0"}
      flightsCount={flights.length - 1}
    />
  );
}

export default Summary;
