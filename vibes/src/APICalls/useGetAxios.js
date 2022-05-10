import axios from "axios";
import { useEffect, useState } from "react";

export const useGetAxios = (apiURL) => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    authorization: localStorage.getItem("userToken")
                }
            }
            const res = await axios.get(apiURL, config);
            setResponse(res.data);    
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        }      
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return { response, loading, error }
}