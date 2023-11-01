import React, { useState } from "react";
import useFetch from "./useFetch";

export function DataPanel() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMap, setIsMap] = useState(false);
    // const API_KEY = import.meta.env.VITE_GOOGLE_KEY
    // const [apiLink, setApiLink] = useState("");
    const { flights, loading, error } = useFetch("jsonTestFile/data.json");

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
                                planeLocationTime={flight.live.updated}
                                scheduledD={flight.departure.scheduled}
                                estimatedD={flight.departure.estimated}
                                actualD={flight.departure.actual}
                                runwayD={flight.departure.actual_runway}
                                scheduledA={flight.arrival.scheduled}
                                estimatedA={flight.arrival.estimated}
                                actualA={flight.arrival.actual}
                                runwayA={flight.arrival.estimated_runway}
                            />
                        )
                    })
                    }
                </>
            )
        }
    }

    if (error) console.log(error);

    const Flight = ({ id, number, airlaneName, departureIata, departureIcao, arrivalIata, arrivalIcao, departureAirport, arrivalAirport, departureTerminal, departureGate, arrivalTerminal, arrivalGate, departureTimeZone, arrivalTimeZone, flightStatus, delayD, delayA, color, latitude, longitude, planeLocationTime, scheduledD, estimatedD, actualD, runwayD, scheduledA, estimatedA, actualA, runwayA }) => {
        // setApiLink(`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${latitude}, ${longitude}&zoom=2`)
        if (flightStatus === false) {
            flightStatus = "Airborne";
            planeLocationTime = (new Date(planeLocationTime).toLocaleTimeString());
            setIsMap(true);
        } else {
            flightStatus = "Grounded";
            setIsMap(false);
        }
        if ((delayA + delayD) > 0) {
            color = "red";
            delayA = "Late"
        } else {
            color = "green";
            delayA = "On time"
        }

        scheduledD = (new Date(scheduledD).toLocaleString());
        estimatedD = (new Date(estimatedD).toLocaleString());
        if (actualD !== null) actualD = (new Date(actualD).toLocaleString());
        if (runwayD !== null) runwayD = (new Date(runwayD).toLocaleString());
        scheduledA = (new Date(scheduledA).toLocaleString());
        estimatedA = (new Date(estimatedA).toLocaleString());
        if (actualA !== null) actualA = (new Date(actualA).toLocaleString());
        if (runwayA !== null) runwayA = (new Date(runwayA).toLocaleString());

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
                                                    {scheduledD}</th>
                                                <th>Estimated <br />
                                                    {estimatedD}</th>
                                            </tr>
                                            <tr>
                                                <th>Actual <br />
                                                    {actualD}</th>
                                                <th>Runway <br />
                                                    {runwayD}</th>
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
                                                    {scheduledA}</th>
                                                <th>Estimated <br />
                                                    {estimatedA}</th>
                                            </tr>
                                            <tr>
                                                <th>Actual <br />
                                                    {actualA}</th>
                                                <th>Runway <br />
                                                    {runwayA}</th>
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

                            {isMap ?
                                <button className="showMap" onClick={setVisible}>
                                    Location
                                </button>
                                : ''}
                        </div>
                    </div>

                    {isMap ?
                        <div className={`map ${isVisible ? "enterM" : ""}`}>
                            This plane position is from {planeLocationTime}.
                            <iframe 
                                src="https://maps.google.com/maps?q=-17.05,-145.41667&amp;t=&amp;z=2&amp;ie=UTF8&amp;iwloc=&amp;output=embed" 
                                frameborder="0" 
                                scrolling="no" 
                                loading="lazy"
                                style="width: 500px; 
                                height: 300px;">
                            </iframe>
                            <button className="showMap" onClick={setVisible}>
                                Panel
                            </button>
                        </div>
                        : ''}
                </div>
            </>
        )
    }

    const setVisible = event => {
        setIsVisible(current => !current);
    }

    return(
        dataScreen()
    )
}