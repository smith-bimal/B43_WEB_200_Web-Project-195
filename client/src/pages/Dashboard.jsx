import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '../config/axios';

function Dashboard() {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/itineraries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(response.data);
    };

    fetchItineraries();
  }, []);

  const handleItineraryClick = (id) => {
    navigate(`/itinerary/${id}`);
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <img src="logo_light.png" alt="Logo" className="h-12" />
          <nav className="space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Discover</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Your Trips</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Archive</a>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-full">New Trip</button>
          </nav>
          <div className="flex space-x-4">
            <i className="fas fa-bell text-gray-700"></i>
            <i className="fas fa-user-circle text-gray-700"></i>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Trip</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Hey Ashik! 👋</h3>
                <p className="text-gray-700">Welcome to Your Nepal Adventure!</p>
                <p className="text-gray-500">The Mountains Are Calling And I Must Go. - John Muir</p>
              </div>
              <div className="bg-gray-200 p-2 rounded-full">
                <span className="text-gray-700">Nepal</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Budget</h2>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32">
                <canvas id="budgetChart"></canvas>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Expenses</h2>
            <ul className="list-disc pl-5">
              <li>Air ticket: $230</li>
              <li>Taxi rent: $10</li>
              <li>King burger: $12</li>
              <li>Trekking gear: $95</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Readiness</h2>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32">
                <canvas id="readinessChart"></canvas>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Destinations</h2>
            <div className="relative h-64">
              {/* Google Map will be embedded here */}
            </div>
            <ul className="list-disc pl-5 mt-4">
              <li>Kathmandu</li>
              <li>Pokhara</li>
              <li>Chitwan</li>
              <li>Everest</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Flight</h2>
            <ul className="list-disc pl-5">
              <li>12 May, 2:30PM: Dhaka to Kathmandu</li>
              <li>22 May, 9:30AM: Kathmandu to Delhi</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Packing List</h2>
            <ul className="list-disc pl-5">
              <li>Backpack</li>
              <li>Camera & GoPro</li>
              <li>Laptop & Charger</li>
              <li>Hot water button</li>
              <li>Medical Aid</li>
              <li>Winter Jacket</li>
            </ul>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-full mt-4">New Reminder</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Days & Activity</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Day 1</h3>
                <p className="text-gray-700">Arrival in Kathmandu</p>
                <p className="text-gray-500">- Arrive in Kathmandu, the capital city of Nepal.</p>
                <p className="text-gray-500">- Check into your accommodation and rest after your journey.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Day 2</h3>
                <p className="text-gray-700">Kathmandu Sightseeing</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">Day 3</h3>
                <p className="text-gray-700">Bhaktapur and Nagarkot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
