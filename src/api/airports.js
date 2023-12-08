import axios from "axios";

export const getMinAirports = (query = "") =>
  axios
    .get(
      "https://round-voice-fc72.maciek.workers.dev/airports?min=1&query=" +
        query
    )
    .then((res) => res.data);
