import React from "react"
import useFetch from "./useFetch";

export default function App() {
  const {flights, loading, error} = useFetch("jsonTestFile/data.json");

  if (loading) return <h1> LOADING... </h1>;

  if (error) console.log(error);

  console.log(flights);

  return (
    <div>
      {flights}

    </div>
  )

  // const Flight = ({ flightDate, flightStatus, arrival, airlane }) => (
  //   <div>
  //     <p>{flightDate}</p>
  //     <p>{flightStatus}</p>
  //     <p>{arrival}</p>
  //     <p>{airlane}</p>
  //   </div>
  // )

  // return (
  //   <div>
  //     {flights.map(flight => (
  //       <div key={flight.id}>
  //         <Flight
  //           flightDate={flight.flightDate}
  //           flightStatus={flight.flightStatus}
  //           arrival={flight.arrival.scheduled}
  //           airlane={flight.airlane.name}
  //         />
  //       </div>
  //       ))
  //     }
  //    </div>
  // )
}