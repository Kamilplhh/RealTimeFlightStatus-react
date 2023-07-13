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

  // function dataScreen() {
  //   if (loading) {
  //     return (
  //       <div className="body">
  //         <div className="scene">
  //           <div className="shadow"></div>
  //           <div className="jumper">
  //             <div className="spinner">
  //               <div className="scaler">
  //                 <div className="loader">
  //                   <div className="cuboid">
  //                     <div className="cuboid__side"></div>
  //                     <div className="cuboid__side"></div>
  //                     <div className="cuboid__side"></div>
  //                     <div className="cuboid__side"></div>
  //                     <div className="cuboid__side"></div>
  //                     <div className="cuboid__side"></div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="dataBlock">
  //         {flights.map(flight => (
  //           <div className="flightData">
  //             <Flight
  //               id={flight.id}
  //               flightDate={flight.flight_date}
  //               flightStatus={flight.flight_status}
  //               arrival={flight.arrival.scheduled}
  //               delay={flight.departure.delay}
  //             />
  //           </div>
  //         ))
  //         }
  //       </div>
  //     )
  //   }
  // }

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
      <p>{flightStatus} </p>
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
              <option value={today}>Today</option>
              <option value={tomorrow}>Tomorrow</option>
            </select>
            <button className="btn">Search Flight</button>
          </div>
        </form>
      </div>

      {/* {dataScreen()} */}

      <div className="dataBlock">
        <div className="flightData">
          <div className="top">
            <p className="flightNumber">
              <h1>UA2402</h1> <br />
              United Airlinies
            </p>
            <div className="mid">
              <p className="midData">
                <h1>Lax</h1> <br />
                Los Angeles Int.
              </p>
              <span>&#9992;</span>
              <p className="midData">
                <h1>BOS</h1> <br />
                Logan Int.
              </p>
            </div>
            <div className="status">
              <p className="statusData">
                <h1>Airborne</h1> <br />
                Late
              </p>
            </div>
          </div>
          <div className="centerData">
            <div className="left">
              <p className="departure">Departure</p>
              <p className="iata"><h1>Los Angeles International</h1><br />
                IATA:LAX • ICAO:KLAX</p>
              <div className="timer">
                <table>
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
                </table>
              </div>
              <div className="terminal">
                <div>
                  <p className="tName">Terminal</p>
                  <p className="tNumber">2</p>
                </div>
                <div>
                  <p className="tName">Gate</p>
                  <p className="tNumber">57</p>
                </div>
              </div>
            </div>

            <div className="right">
              <p className="departure">Arrival</p>
              <p className="iata"><h1>Logan International</h1><br />
                IATA:BOS • ICAO:KBOS</p>
              <div className="timer">
                <table>
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
                </table>
              </div>
              <div className="terminal">
                <div>
                  <p className="tName">Terminal</p>
                  <p className="tNumber">2</p>
                </div>
                <div>
                  <p className="tName">Gate</p>
                  <p className="tNumber">57</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            Departure Timezone: America/Los_Angeles • Arrival Timezone: America/New_York
          </div>
        </div>
      </div>
    </>
  )
}