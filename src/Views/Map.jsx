import { SvgMap, SvgMapLink, SvgMapMarker } from "../Components/svgmap";
import airports from "../../public/airports.json";

const airportIndex = airports.reduce((acc, a) => {
  acc[a.code] = { ...a.coordinates, code: a.code, name: a.name };
  return acc;
}, {});

function Map({ flights }) {
  const mapFlights = flights.map(
    (f) => airportIndex[f.outbound.arrivalAirport.iataCode]
  );

  return (
    <SvgMap selectedCountries={[]}>
      {mapFlights.map((a, i) => (
        <>
          <SvgMapMarker latlng={`${a.latitude},${a.longitude}`} name={a.name} />
          {i + 1 < flights.length ? (
            <SvgMapLink
              from={{ lat: a.latitude, lng: a.longitude }}
              to={{
                lat: mapFlights[i + 1].latitude,
                lng: mapFlights[i + 1].longitude,
              }}
            />
          ) : null}
        </>
      ))}
    </SvgMap>
  );
}

export default Map;
