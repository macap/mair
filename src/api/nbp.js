import axios from "axios";

export const getCurrencyRates = () =>
  axios
    .get("https://round-voice-fc72.maciek.workers.dev/exchangerates")
    .then((res) => res.data);
