import React, { useEffect, useState } from "react"

export default function App() {
  const [flights, setFlights] = useState([])

  const getData = () => {
    fetch('jsonTestFile/data.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setFlights(data)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const Flight = ({ flightDate, flightStatus, arrival, airlane }) => (
    <div>
      <p>{flightDate}</p>
      <p>{flightStatus}</p>
      <p>{arrival}</p>
      <p>{airlane}</p>
    </div>
  )

  return (
    <div>
      {flights.map(flight => (
        <div key={flight.id}>
          <Flight
            flightDate={flight.flightDate}
            flightStatus={flight.flightStatus}
            arrival={flight.arrival.scheduled}
            airlane={flight.airlane.name}
          />
        </div>
        ))
      }
     </div>
  )
}