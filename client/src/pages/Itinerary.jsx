import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from '../config/axios';

function Itinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/itineraries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItinerary(response.data);
    };

    fetchItinerary();
  }, [id]);

  if (!itinerary) return <div>Loading...</div>;

  return (
    <div className="itinerary p-8">
      <h1 className="text-4xl font-bold mb-4 text-orange-500">{itinerary.title}</h1>
      {/* Add components for activities, destinations, and expenses here */}
    </div>
  );
}

export default Itinerary;
