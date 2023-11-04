import SummaryComponent from "../Components/Summary";
import { parseJSON, differenceInCalendarDays } from "date-fns";

// todo: currency: https://api.nbp.pl/api/exchangerates/tables/A?format=json

function Summary({ flights }) {
  if (flights.length < 2) return null;
  const startDate = flights[0].outbound.departureDate;
  const endDate = flights[flights.length - 1].outbound.arrivalDate;

  const days = differenceInCalendarDays(
    parseJSON(endDate),
    parseJSON(startDate)
  );

  return (
    <SummaryComponent
      price={flights
        .slice(1)
        .map((e) => `${e.summary.price.value}${e.summary.price.currencySymbol}`)
        .join(" + ")}
      currency={""}
      startDate={flights[0].outbound.departureDate}
      endDate={flights[flights.length - 1].outbound.arrivalDate}
      daysCount={days}
      flightsCount={flights.length - 1}
    />
  );
}

export default Summary;
