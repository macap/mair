import React, { useState } from 'react';
// https://www.ryanair.com/api/views/locate/5/airports/en/active
import airports from '../../public/airports.json';

const airportsList = airports.map((el) => ({
  value: el.code,
  label: `${el.name}, ${el.city.name}, ${el.country.name}`,
}));

function StartForm({ addFlight }) {
  const [departureDate, setDepartureDate] = useState();
  const [departureAirport, setDepartureAirport] = useState();

  const submit = () => {
    const origin = departureAirport;
    const date = departureDate;
    addFlight({
      outbound: {
        departureAirport: {
          iataCode: origin,
          name: origin,
          city: { name: 'Home' },
        },
        arrivalAirport: {
          iataCode: origin,
          name: origin,
          city: { name: 'Home' },
        },
        departureDate: `${date}T00:00:00`,
        arrivalDate: `${date}T00:00:00`,
      },
    });
  };

  return (
    <div
      style={{ border: '1px solid lightgray', padding: '10px', margin: '5px' }}
    >
      <h1>Set start point</h1>
      <div>
        <h2>Select origin:</h2>
        <select onChange={(e) => setDepartureAirport(e.target.value)}>
          {airportsList.map((airport) => (
            <option value={airport.value}>{airport.label}</option>
          ))}
        </select>
        {departureAirport}
      </div>
      <div>
        <h2>Select departure date:</h2>
        <input type="date" onChange={(e) => setDepartureDate(e.target.value)} />
        {departureDate}
      </div>
      <button disabled={!departureDate || !departureAirport} onClick={submit}>
        Search
      </button>
    </div>
  );
}

export default StartForm;
