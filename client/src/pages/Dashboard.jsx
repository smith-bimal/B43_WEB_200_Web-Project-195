import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '../config/axios';
import DashboardNavbar from '../components/DashboardNavbar';
import Spinner from '../components/Spinner';
import GMap from '../components/GMap';
import BudgetChart from '../components/BudgetChart';

function Dashboard() {
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('/itineraries', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItineraries(response.data);
      } catch (error) {
        console.error('Failed to fetch itineraries:', error);
      } finally {
        setIsLoading(false);
        setItineraries(['Kathmandu', 'Pokhara', 'Chitwan', 'Everest']);
      }
    };

    fetchItineraries();
  }, []);

  const handleItineraryClick = (id) => {
    navigate(`/itinerary/${id}`);
  };

  return (
    <main className='p-8'>
      <DashboardNavbar />
      <div className="p-4 mt-8 mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-8 md:grid-cols-2">
          <div className="col-span-1 bg-gray-800 p-4 rounded-3xl text-white lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">YOUR TRIP</h2>
              <span className="relative">
                <span className="bg-gray-700 rounded-full text-white cursor-pointer px-4 py-1" onClick={toggleDropdown}>
                  Nepal <i className="fa-angle-down fa-solid"></i>
                </span>
                {showDropdown && itineraries.length > 0 && (
                  <ul className="bg-white rounded-lg shadow-lg text-black absolute mt-2 overflow-hidden z-10">
                    {itineraries.map((destination, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                        onClick={() => {
                          toggleDropdown();
                          // Handle destination selection here
                        }}
                      >
                        {destination}
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </div>
            <div className="text-2xl font-bold mb-2">Hey Ashik! 👋</div>
            <div className="text-lg">Welcome To Your Nepal Adventure!</div>
            <div className="text-gray-400 text-sm">The Mountains Are Calling And I Must Go. - John Muir</div>
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-4">
            <div className="bg-[#f5f5f5] p-4 rounded-3xl">
              <h2 className="text-xl font-semibold mb-4"><i className="fa-chart-pie fa-solid mr-2"></i>BUDGET</h2>
              <BudgetChart />
            </div>

            <div className="bg-[#f5f5f5] p-4 rounded-3xl">
              <h2 className="text-xl font-semibold mb-4"><i className="fa-file-invoice fa-solid mr-2"></i>EXPENSES</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Air ticket</span>
                  <span>$230</span>
                </li>
                <li className="flex justify-between">
                  <span>Taxi rent</span>
                  <span>$10</span>
                </li>
                <li className="flex justify-between">
                  <span>King burger</span>
                  <span>$12</span>
                </li>
                <li className="flex justify-between">
                  <span>Trekking gear</span>
                  <span>$95</span>
                </li>
                <li className="flex justify-between">
                  <span>Record</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-2 bg-yellow-100 p-4 rounded-3xl">
            <h2 className="text-xl font-semibold mb-4"><i className="fa-hourglass-half fa-solid mr-2"></i>READINESS</h2>
            <div className="flex justify-center items-center">
              <div className="relative">
                <Spinner />
                <div className='text-center -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2'>
                  <span className='text-8xl font-bold'>17</span>
                  <p className="text-center">Days left</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-4 rounded-3xl lg:col-span-3 relative">
            <h2 className="text-xl font-semibold mb-4"><i className="fa-location-crosshairs fa-solid mr-2"></i>DESTINATIONS</h2>
            <GMap />
            <ul className="absolute bottom-4 mt-4 space-y-2">
              <li><i className="fa-location-dot fa-solid mr-2"></i>Kathmandu</li>
              <li><i className="fa-location-dot fa-solid mr-2"></i>Pokhara</li>
              <li><i className="fa-location-dot fa-solid mr-2"></i>Chitwan</li>
              <li><i className="fa-location-dot fa-solid mr-2"></i>Everest</li>
            </ul>
          </div>

          <div className="col-span-1 bg-purple-100 p-4 rounded-3xl lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4"><i className="fa-person-walking fa-solid mr-2"></i> DAYS &amp; ACTIVITY</h2>
            <ul className="space-y-2">
              <li>
                <strong>Day 1:</strong> Arrival in Kathmandu
              </li>
              <li className="text-gray-400 text-sm">
                - Arrive in Kathmandu, the capital city of Nepal. Check into your accommodation and rest after your journey.
              </li>
              <li>
                <strong>Day 2:</strong> Kathmandu Sightseeing
              </li>
              <li>
                <strong>Day 3:</strong> Bhaktapur and Nagarkot
              </li>
            </ul>
          </div>

          <div className="col-span-2 bg-[#f5f5f5] p-4 rounded-3xl">
            <h2 className="text-xl font-semibold mb-4"><i className="fa-clipboard-list fa-solid mr-2"></i>PACKING LIST</h2>
            <ul className="space-y-2">
              <li>Backpack</li>
              <li>Camera &amp; GoPro</li>
              <li>Laptop &amp; Charger</li>
              <li>Hot water button</li>
              <li>Medical Aid</li>
              <li>Winter Jacket</li>
            </ul>
            <button className="bg-yellow-500 rounded-full text-white mt-4 px-4 py-2">New Reminder</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
