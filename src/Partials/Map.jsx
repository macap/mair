import { useSelector } from "react-redux";
import { SvgMap, SvgMapLink, SvgMapMarker } from "../Components/svgmap";
import airports from "../data/airports_data.json";

const airportIndex = airports.reduce((acc, a) => {
  acc[a.code] = { ...a.coordinates, code: a.code, name: a.name };
  return acc;
}, {});

function FlightDots() {
  const flights = useSelector((state) => state.selectedFlights);
  const mapFlights = flights.map(
    (f) => airportIndex[f.outbound.arrivalAirport.iataCode]
  );

  return (
    <>
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
              color="#ffc300ff"
            />
          ) : null}
        </>
      ))}
    </>
  );
}

function Map() {
  return (
    <SvgMap>
      <FlightDots />
    </SvgMap>
  );
}

export default Map;
