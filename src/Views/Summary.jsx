import { useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { parseJSON, differenceInCalendarDays } from "date-fns";
import SummaryComponent from "../Components/Summary";
import FlightsModal from "../Components/FlightsModal";
import { getCurrencyRates } from "../api/nbp";

// todo: currency: https://api.nbp.pl/api/exchangerates/tables/A?format=json
// https://api.nbp.pl/api/exchangerates/tables/B?format=json

function useCurrencyConverter(values) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["rates"],
    queryFn: getCurrencyRates,
    staleTime: 1200000,
  });

  if (error) console.error("An error has occurred: " + error.message);

  if (error || isPending || isFetching || !values.length > 0) return null;

  const rates = data.reduce((o, v) => {
    o[v.code] = v.mid;
    return o;
  }, {});

  const totalPLN = values.reduce((sum, [val, curr]) => {
    return sum + val * rates[curr];
  }, 0);

  return Math.round(totalPLN * 100) / 100 + " PLN";
}

function Summary({ flights }) {
  const [showModal, setShowModal] = useState(false);
  const totalPrice = useCurrencyConverter(
    flights
      .slice(1)
      .map((e) => [e.summary.price.value, e.summary.price.currencyCode])
  );

  if (flights.length < 2) return null;

  const startDate = flights[0].outbound.departureDate;
  const endDate = flights[flights.length - 1].outbound.arrivalDate;

  const days = differenceInCalendarDays(
    parseJSON(endDate),
    parseJSON(startDate)
  );

  const currTotal = flights
    .slice(1)
    .map((e) => e.summary.price)
    .reduce((acc, v) => {
      if (acc[v.currencyCode]) {
        acc[v.currencyCode] += v.value;
      } else {
        acc[v.currencyCode] = v.value;
      }
      return acc;
    }, {});

  const priceInfo = Object.keys(currTotal)
    .map((cur) => `${Math.round(currTotal[cur] * 100) / 100} ${cur}`)
    .join(" + ");

  return (
    <>
      <SummaryComponent
        price={totalPrice}
        priceInfo={priceInfo}
        currency={""}
        startDate={flights[0].outbound.departureDate}
        endDate={flights[flights.length - 1].outbound.arrivalDate}
        daysCount={days}
        flightsCount={flights.length - 1}
        onClick={() => setShowModal(true)}
      />
      {showModal &&
        createPortal(
          <FlightsModal
            flights={flights}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}

export default Summary;
