import { useQuery } from "@tanstack/react-query";
import { getCurrencyRates } from "../api/nbp";

function useCurrencyConverter(
  values: { value: number; currencyCode: string }[]
) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["rates"],
    queryFn: getCurrencyRates,
    staleTime: 1200000,
  });

  if (error) console.error("An error has occurred: " + error.message);

  if (error || isPending || isFetching || values.length === 0) return null;

  const rates = data.reduce((o, v) => {
    o[v.code] = v.mid;
    return o;
  }, {}) as { [k: string]: number };

  // check if all required rates are available:
  if (
    !values.every(
      ({ currencyCode }) => currencyCode === "PLN" || !!rates[currencyCode]
    )
  )
    return null;

  const totalPLN = values.reduce((sum, { value: val, currencyCode: curr }) => {
    const plnval = curr === "PLN" ? val : val * rates[curr];
    return sum + plnval;
  }, 0);

  return Math.round(totalPLN * 100) / 100 + " PLN";

  // TODO:
  // const totalPLNRounded = Math.round(totalPLN * 100) / 100;

  // const groupedValues =

  // return {
  //   value: totalPLNRounded,
  //   currencyCode: 'PLN',
  //   groupedValues:
  // };
}

export default useCurrencyConverter;
