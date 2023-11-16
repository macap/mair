import DepartureForm from "../Components/DepartureForm";
import HomePage from "../Components/HomePage";

function StartForm({ addFlight }) {
  const submit = (departureAirport, departureDate) => {
    const origin = departureAirport;
    const date = departureDate;
    addFlight({
      outbound: {
        departureAirport: {
          iataCode: origin,
          name: origin,
          city: { name: "Home" },
        },
        arrivalAirport: {
          iataCode: origin,
          name: origin,
          city: { name: "Home" },
        },
        departureDate: `${date}T00:00:00`,
        arrivalDate: `${date}T00:00:00`,
      },
      summary: {
        price: {
          value: 0,
          currencyCode: "PLN",
          currencySymbol: "zł",
        },
      },
    });
  };

  return (
    <HomePage>
      <DepartureForm onSubmit={submit} />
    </HomePage>
  );
}

export default StartForm;
