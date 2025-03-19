import React, { useState } from 'react';
import axios from 'axios';

function AddActivityModal({ itineraryId, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post(
      '/api/activities',
      { name, type, date, time, itinerary: itineraryId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    onAdd(response.data);
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Activity Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded">Add</button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">Close</button>
      </div>
    </div>
  );
}

export default AddActivityModal;
