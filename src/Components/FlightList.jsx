import ExpandableList from "./ExpandableList";
import { isBefore } from "date-fns";
import FlightListElement from "./FlightListElement";

function FlightList({ data, onSelect, currentDate }) {
  return (
    <div style={{ maxWidth: "600px" }}>
      <ExpandableList>
        {data.fares.map((el) => {
          const disabled = isBefore(
            new Date(el.outbound.departureDate),
            currentDate
          );
          const [departureDate, departureTime] =
            el.outbound.departureDate.split("T");
          const [arrivalDate, arrivalTime] = el.outbound.arrivalDate.split("T");

          const duration = "??h ??min";

          return (
            <FlightListElement
              departureDate={departureDate}
              departureTime={departureTime}
              departureAirportName={el.outbound.departureAirport.name}
              departureAirportCode={el.outbound.departureAirport.iataCode}
              departureCountryName={el.outbound.departureAirport.countryName}
              arrivalDate={arrivalDate}
              arrivalTime={arrivalTime}
              arrivalAirportName={el.outbound.arrivalAirport.name}
              arrivalAirportCode={el.outbound.arrivalAirport.iataCode}
              arrivalCountryName={el.outbound.arrivalAirport.countryName}
              number={el.outbound.flightNumber}
              duration={duration}
              priceValue={el.summary.price.value}
              currencySymbol={el.summary.price.currencySymbol}
              key={el.outbound.arrivalAirport.iataCode}
              isDisabled={disabled}
              onClick={disabled ? () => null : () => onSelect(el)}
            />
          );
        })}
      </ExpandableList>
    </div>
  );
}

export default FlightList;

{
  /* <li>
  <div>
    {disabled ? "❌" : ""}
    <a
      href="#"
      onClick={() => onSelect(el)}
      style={disabled ? { opacity: 0.5 } : {}}
    >
      {el.outbound.arrivalAirport.name} ({el.outbound.arrivalAirport.iataCode})
      {el.outbound.arrivalAirport.countryName}
    </a>
    , {} {}
  </div>
  <div>
    {el.outbound.departureDate} - {el.outbound.arrivalDate}
  </div>
</li>; */
}
