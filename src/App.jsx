import React, { useState } from "react"
import useFetch from "./useFetch";

export default function App() {
  const { flights, loading, error } = useFetch("jsonTestFile/data.json");
  const [NewAirLine, setNewAirLine] = useState("");
  const [NewFlightNumber, setNewFlightNumber] = useState("");
  const current = new Date();
  const today = `${current.getFullYear()}-${('0' + (current.getMonth() + 1)).slice(-2)}-${('0' + current.getDate()).slice(-2)}`;
  const [newDate, setNewDate] = useState(today);

  function dataScreen() {
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
    } else {
      return (
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
      )
    }
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
      <p>{flightStatus} <span>&#9992;</span></p>
      <p>{arrival}</p>
      <p>{delay}</p>
    </div>
  )

  return (
    <>
      <div className="flightForm">
        <img src="./img/plane.png" />
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" id="airLine" className="formRows" value={NewAirLine} autoComplete="off" placeholder="Airline (e.g United Airlines)" onChange={e => setNewAirLine(e.target.value)} required />
            <input type="text" id="flightNumber" className="formRows" value={NewFlightNumber} autoComplete="off" placeholder="Flight Number (e.g. UA2402)" onChange={e => setNewFlightNumber(e.target.value)} required />
            <select id="date" className="formRows" onChange={e => setNewDate(e.target.value)} required>
            <option value="" disabled selected>Choose your date</option>
              <option value={today}>{today}</option>
              <option value="test">test</option>
            </select>
            <button className="btn">Search Flight </button>
          </div>
        </form>
      </div>

      {dataScreen()}
    </>
  )
}