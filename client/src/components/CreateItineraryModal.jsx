import React, { useState } from 'react';

function CreateItineraryModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title });
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Trip Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded">Create</button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">Close</button>
      </div>
    </div>
  );
}

export default CreateItineraryModal;
