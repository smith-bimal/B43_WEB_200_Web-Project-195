import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from '../config/axios';

function Trips() {
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
    <div className="p-8 itinerary">
      <h1 className="text-4xl text-orange-500 font-bold mb-4">{itinerary.title}</h1>
    </div>
  );
}

export default Trips;
