import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
        .get(url)
        .then((response) => {
            setFlights(response.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [url]);

    return {flights, loading, error};
}

export default useFetch