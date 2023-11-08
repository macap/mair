import axios from "axios";

export const getCurrencyRates = () =>
  axios
    .all([
      axios.get("https://api.nbp.pl/api/exchangerates/tables/A?format=json"),
      axios.get("https://api.nbp.pl/api/exchangerates/tables/B?format=json"),
    ])
    .then(([res1, res2]) => {
      //   console.log([res1, res2]);
      return [res1.data, res2.data];
    })
    .then(([res1, res2]) => [...res1[0].rates, ...res2[0].rates]);
