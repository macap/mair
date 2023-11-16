import { useQuery } from "@tanstack/react-query";
import { getCurrencyRates } from "../api/nbp";

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
    const plnval = curr === "PLN" ? val : val * rates[curr];
    return sum + plnval;
  }, 0);

  return Math.round(totalPLN * 100) / 100 + " PLN";
}

export default useCurrencyConverter;
