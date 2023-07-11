import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
        .get(url)
        .then((response) => {
            setFlights(response.data.data);  
        }).catch((err) => {
            setError(err);
        }).finally(() => {  
            const timer = setTimeout(() => setLoading(false),400000000);     
            
            return () => clearTimeout(timer);
        });
    }, [url]);

    return {flights, loading, error};
}

export default useFetch