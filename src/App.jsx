import React, { useState } from "react"
import useFetch from "./useFetch";

export default function App() {
  const { flights, loading, error } = useFetch("jsonTestFile/data.json");
  const [NewAirLine, setNewAirLine] = useState("");
  const [NewFlightNumber, setNewFlightNumber] = useState("");
  const current = new Date();
  const today = `${current.getFullYear()}-${('0' + (current.getMonth() + 1)).slice(-2)}-${('0' + current.getDate()).slice(-2)}`;
  const [newDate, setNewDate] = useState(today);

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

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit(NewAirLine, NewFlightNumber, newDate)

    setNewAirLine("")
    setNewFlightNumber("")
    setNewDate(today)
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
    <>
      <form onSubmit={handleSubmit} className="flightForm">
        <div className="formRows">
          <input type="text" id="airLine" value={NewAirLine} autoComplete="off" onChange={e => setNewAirLine(e.target.value)} required />
          <input type="text" id="flightNumber" value={NewFlightNumber} autoComplete="off" onChange={e => setNewFlightNumber(e.target.value)} required />
          <input type="date" name="deadline" value={newDate} onChange={e => setNewDate(e.target.value)} id="date" min={today} />
          <button className="btn">Add</button>
        </div>

      </form>

      <div className="dataBlock">
        {flights.map(flight => (
          <div className="flightData">
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
    </>
  )
}