import { useDispatch } from "react-redux";
import { addFlight } from "../store/selectedFlights";
import DepartureForm from "../Components/DepartureForm";
import HomePage from "../Components/HomePage";

function StartForm({ add }) {
  const submit = (departureAirport, departureDate) => {
    const origin = departureAirport;
    const date = departureDate;
    add({
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

function ConnectedStartForm() {
  const dispatch = useDispatch();

  const addFlight2 = (flight) => {
    dispatch(addFlight(flight));
  };

  return <StartForm add={addFlight2} />;
}

export default ConnectedStartForm;
