import React from "react"
import useFetch from "./useFetch";

export default function App() {
  const { flights, loading, error } = useFetch("jsonTestFile/data.json");

  if (loading) return <h1> LOADING... </h1>;

  if (error) console.log(error);

  console.log(flights);

  const Flight = ({ flightDate, flightStatus, arrival, delay }) => (
    <div>
      <p>{flightDate}</p>
      <p>{flightStatus}</p>
      <p>{arrival}</p>
      <p>{delay}</p>
    </div>
  )

  return (
    <div>
      {flights.map(flight => (
        <div key={flight.id}>
          <Flight
            flightDate={flight.flight_date}
            flightStatus={flight.flight_status}
            arrival={flight.arrival.scheduled}
            delay={flight.departure.delay}
          />
        </div>
        ))
      }
     </div>
  )
}