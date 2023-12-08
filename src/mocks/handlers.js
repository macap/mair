import { http, HttpResponse } from "msw";
import { format, add } from "date-fns";
import data from "./data.json";
import airports from "./airports.json";
import curr from "./curr.json";

export const handlers = [
  http.get("/data", ({ request, params, cookies }) => {
    return HttpResponse.json(data);
  }),
  http.get("https://round-voice-fc72.maciek.workers.dev/exchangerates", () =>
    HttpResponse.json(curr)
  ),
  http.get(
    "https://www.ryanair.com/api/farfnd/v4/oneWayFares",
    ({ request, params, cookies }) => {
      const url = new URL(request.url);

      const departureDate = url.searchParams.get("outboundDepartureDateFrom");
      const departureAirportIataCode = url.searchParams.get(
        "departureAirportIataCode"
      );

      if (!departureDate || !departureAirportIataCode) {
        return new HttpResponse(null, { status: 402 });
      }

      const departureAirport = airports.find(
        (a) => a.code === departureAirportIataCode
      );

      const nextDayDate = format(
        add(new Date(departureDate), { days: 1 }),
        "yyyy-MM-dd"
      );

      const currency = [
        { currencyCode: "EUR", currencySymbol: "€" },
        { currencyCode: "PLN", currencySymbol: "zł" },
        { currencyCode: "HUF", currencySymbol: "Ft" },
      ][departureAirportIataCode === "WAW" ? 1 : Math.floor(Math.random() * 3)];

      const mockedData = {
        ...data,
        fares: [
          ...data.fares
            .filter(
              (f) =>
                f.outbound.arrivalAirport.iataCode !== departureAirportIataCode
            )
            .map((f) => ({
              ...f,
              outbound: {
                ...f.outbound,
                departureAirport: {
                  ...f.outbound.departureAirport,
                  iataCode: departureAirportIataCode,
                  name: departureAirport.name,
                  city: {
                    ...f.outbound.departureAirport,
                    name: departureAirport.city.name,
                  },
                },
                departureDate: [
                  departureDate,
                  f.outbound.departureDate.split("T")[1],
                ].join("T"),
                arrivalDate: [
                  f.outbound.arrivalDate.indexOf("2023-11-11") !== -1
                    ? departureDate
                    : nextDayDate,
                  f.outbound.arrivalDate.split("T")[1],
                ].join("T"),
                price: { ...f.outbound.price, ...currency },
              },
              summary: {
                ...f.summary,
                price: {
                  ...f.summary.price,
                  ...currency,
                },
              },
            })),
        ],
      };

      return HttpResponse.json(mockedData);
    }
  ),
];
