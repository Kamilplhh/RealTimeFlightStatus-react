import React, { useState } from "react"
import useFetch from "./useFetch";

export default function App() {
  const { flights, loading, error } = useFetch("jsonTestFile/data.json");
  const [NewAirLine, setNewAirLine] = useState("");
  const [NewFlightNumber, setNewFlightNumber] = useState("");
  const current = new Date();
  const today = `${current.getFullYear()}-${('0' + (current.getMonth() + 1)).slice(-2)}-${('0' + current.getDate()).slice(-2)}`;
  const tomorrow = `${current.getFullYear()}-${('0' + (current.getMonth() + 1)).slice(-2)}-${('0' + (current.getDate() + 1)).slice(-2)}`;
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
        <>
          {flights.map(flight => {
            return (
              <Flight
                id={flight.uniqueId}
                number={flight.flight.iata}
                airlaneName={flight.airline.name}
                departureIata={flight.departure.iata}
                departureIcao={flight.departure.icao}
                arrivalIata={flight.arrival.iata}
                arrivalIcao={flight.arrival.icao}
                departureAirport={flight.departure.airport}
                arrivalAirport={flight.arrival.airport}
                departureTerminal={flight.departure.terminal}
                departureGate={flight.departure.gate}
                arrivalTerminal={flight.arrival.terminal}
                arrivalGate={flight.arrival.gate}
                departureTimeZone={flight.departure.timezone}
                arrivalTimeZone={flight.arrival.timezone}
                flightStatus={flight.live.is_ground}
                delayD={flight.departure.delay}
                delayA={flight.arrival.delay}
                latitude={flight.live.latitude}
                longitude={flight.live.longitude}
              />
            )
          })
          }
        </>
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

  const Flight = ({ id, number, airlaneName, departureIata, departureIcao, arrivalIata, arrivalIcao, departureAirport, arrivalAirport, departureTerminal, departureGate, arrivalTerminal, arrivalGate, departureTimeZone, arrivalTimeZone, flightStatus, delayD, delayA, color, latitude, longitude }) => {
    if (flightStatus === false) {
      flightStatus = "Airborne";
    } else {
      flightStatus = "Grounded";
    }
    if ((delayA + delayD) > 0) {
      color = "red";
      delayA = "Late"
    } else {
      color = "green";
      delayA = "On time"
    }
    return (
      <>
        <div className="dataBlock" key={id}>
          <div className="flightData">
            <div className="top">
              <span className="flightNumber">
                <h1>{number}</h1> <br />
                {airlaneName}
              </span>
              <div className="mid">
                <h1><span className="midData">
                  {departureIata}
                </span></h1>
                <span>&#9992;</span>
                <h1><span className="midData">
                  {arrivalIata}
                </span></h1>
              </div>
              <div className="status" style={{ backgroundColor: color }}>
                <span className="statusData">
                  <h1>{flightStatus}</h1> <br />
                  {delayA}
                </span>
              </div>
            </div>
            <div className="centerData">
              <div className="left">
                <p className="departure">Departure</p>
                <span className="iata" ><h1>{departureAirport}</h1><br />
                  IATA:{departureIata} • ICAO:{departureIcao}</span>
                <div className="timer">
                  <table>
                    <tbody>
                      <tr>
                        <th>Scheduled <br />
                          2020-11-29 20:00:00</th>
                        <th>Estimated <br />
                          2020-11-29 20:00:00</th>
                      </tr>
                      <tr>
                        <th>Actual <br />
                          2020-11-29 20:00:00</th>
                        <th>Runway <br />
                          2020-11-29 20:00:00</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="terminal">
                  <div>
                    <p className="tName">Terminal</p>
                    <p className="tNumber">{departureTerminal}</p>
                  </div>
                  <div>
                    <p className="tName">Gate</p>
                    <p className="tNumber">{departureGate}</p>
                  </div>
                </div>
              </div>

              <div className="right">
                <p className="departure">Arrival</p>
                <span className="iata"><h1>{arrivalAirport}</h1><br />
                  IATA:{arrivalIata} • ICAO:{arrivalIcao}</span>
                <div className="timer">
                  <table>
                    <tbody>
                      <tr>
                        <th>Scheduled <br />
                          2020-11-29 20:00:00</th>
                        <th>Estimated <br />
                          2020-11-29 20:00:00</th>
                      </tr>
                      <tr>
                        <th>Actual <br />
                          2020-11-29 20:00:00</th>
                        <th>Runway <br />
                          2020-11-29 20:00:00</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="terminal">
                  <div>
                    <p className="tName">Terminal</p>
                    <p className="tNumber">{arrivalTerminal}</p>
                  </div>
                  <div>
                    <p className="tName">Gate</p>
                    <p className="tNumber">{arrivalGate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              Departure Timezone: {departureTimeZone}
              <p className="dot">
                •
              </p>
              Arrival Timezone: {arrivalTimeZone}
            </div>
          </div>

          <div className="map">
            <iframe
              width="500"
              height="350"
              loading="lazy"
              src="https://www.google.com/maps/embed/v1/place?key=&q=-17.05, -145.41667&zoom=2">
            </iframe>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flightForm">
        <img src="./img/plane.png" />
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" id="airLine" className="formRows" value={NewAirLine} autoComplete="off" placeholder="Airline (e.g United Airlines)" onChange={e => setNewAirLine(e.target.value)} required />
            <input type="text" id="flightNumber" className="formRows" value={NewFlightNumber} autoComplete="off" placeholder="Flight Number (e.g. UA2402)" onChange={e => setNewFlightNumber(e.target.value)} required />
            <select id="date" className="formRows" onChange={e => setNewDate(e.target.value)} required>
              <option value={today}>Today</option>
              <option value={tomorrow}>Tomorrow</option>
            </select>
            <button className="btn">Search Flight</button>
          </div>
        </form>
      </div>

      <div className="bgPlane"></div>

      {dataScreen()}

    </>
  )
}