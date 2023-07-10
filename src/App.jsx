import React from "react"
import useFetch from "./useFetch";

export default function App() {
  const { flights, loading, error } = useFetch("jsonTestFile/data.json");

  if (loading) {
    return (
    <div className="body">
      <div className="scene">
        <div className="shadow"></div>
        <div className="jumper">
          <div className="spinner">
            <div className="scaler">
              <div className="loader">
                <div className="cuboid">
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                  <div className="cuboid__side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div> 
    );
  }

  if (error) console.log(error);

  const Flight = ({ id, flightDate, flightStatus, arrival, delay }) => (
    <div key={id}>
      <p>{flightDate}</p>
      <p>{flightStatus}</p>
      <p>{arrival}</p>
      <p>{delay}</p>
    </div>
  )

  return (
    <div>
      {flights.map(flight => (
        <div>
          <Flight
            id={flight.id}
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