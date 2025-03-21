import { useState, useEffect } from 'react';
import axios from '../config/axios';

export const useItineraries = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItineraries = async () => {
        try {
            const response = await axios.get('/itineraries');
            setItineraries(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch itineraries');
            setItineraries([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItineraries();
    }, []);

    return { itineraries, loading, error, refreshItineraries: fetchItineraries };
};