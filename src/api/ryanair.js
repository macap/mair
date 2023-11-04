import axios from "axios";

export const getFlights = () => axios.get("/data").then((res) => res.data);

//https://www.ryanair.com/api/farfnd/v4/oneWayFares?departureAirportIataCode=WAW&outboundDepartureDateFrom=2023-11-11&market=en-ie&adultPaxCount=1&outboundDepartureDateTo=2023-11-11&outboundDepartureTimeFrom=00:00&outboundDepartureTimeTo=23:59"
export const getOneWayFares = ({ queryKey }) => {
  const [_key, { origin, date, timeFrom, timeTo }] = queryKey;

  return axios
    .get("https://www.ryanair.com/api/farfnd/v4/oneWayFares", {
      params: {
        departureAirportIataCode: origin,
        outboundDepartureDateFrom: date,
        outboundDepartureDateTo: date,
        outboundDepartureTimeFrom: timeFrom,
        outboundDepartureTimeTo: timeTo,
        market: "en-ie",
        adultPaxCount: 1,
      },
    })
    .then((res) => res.data);
};
