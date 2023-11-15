import FlightListElement from "../FlightListElement";
import Modal from "../Modal";
function FlightsModal({ flights, onClose }) {
  const onSelect = () => null;
  return (
    <div data-testid="area-flightsmodal">
      <Modal onClose={onClose}>
        <div></div>
        {flights.slice(1).map((el) => {
          const [departureDate, departureTime] =
            el.outbound.departureDate.split("T");
          const [arrivalDate, arrivalTime] = el.outbound.arrivalDate.split("T");

          const duration = "??h ??min";

          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "600px" }}>
                <FlightListElement
                  departureDate={departureDate}
                  departureTime={departureTime}
                  departureAirportName={el.outbound.departureAirport.name}
                  departureAirportCode={el.outbound.departureAirport.iataCode}
                  departureCountryName={
                    el.outbound.departureAirport.countryName
                  }
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
                  isDisabled={false}
                  withDate
                />
              </div>
              <a
                href={`https://www.ryanair.com/ie/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=${departureDate}&isReturn=false&originIata=${el.outbound.departureAirport.iataCode}&destinationIata=${el.outbound.arrivalAirport.iataCode}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 10px 0 15px" }}
              >
                Book on ryanair.com
              </a>
            </div>
          );
        })}
      </Modal>
    </div>
  );
}

export default FlightsModal;
