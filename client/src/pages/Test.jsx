import React, { useState, useEffect } from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import BudgetChart from '../components/BudgetChart'
import Spinner from '../components/Spinner'
import GMap from '../components/GMap'

const Test = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const itineraries = ["Kathmandu", "Pokhara", "Chitwan", "Everest"];

    useEffect(() => {
        // Initialize Google Maps or Mapbox API here
        // Add markers for points of interest
    }, []);

    return (
        <main className='p-8'>
            <DashboardNavbar />
            <div className="p-4 mt-8 mx-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-8 md:grid-cols-2">
                    <div className="col-span-1 bg-gray-800 p-4 rounded-3xl shadow-sm text-white lg:col-span-3 overflow-hidden relative">
                        <img src="https://cdn.pixabay.com/photo/2019/08/12/17/11/asphalt-road-4401704_960_720.jpg" alt="" className='w-full -translate-x-1/2 -translate-y-1/2 absolute blur-[5px] brightness-50 left-1/2 top-1/2 z-0' />
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <h2 className="text-xl font-semibold">YOUR TRIP</h2>
                            <span className="relative">
                                <span className="bg-gray-700 rounded-full text-white cursor-pointer px-4 py-1" onClick={toggleDropdown}>
                                    Nepal <i className="fa-angle-down fa-solid"></i>
                                </span>
                                {showDropdown && (
                                    <ul className="bg-white rounded-lg shadow-lg text-black absolute mt-2 overflow-hidden">
                                        {itineraries.map((destination, index) => (
                                            <li key={index} className="cursor-pointer hover:bg-gray-200 px-4 py-2">{destination}</li>
                                        ))}
                                    </ul>
                                )}
                            </span>
                        </div>
                        <div className="text-2xl font-bold mb-2 relative z-10">Hey Ashik! 👋</div>
                        <div className="text-lg relative z-10">Welcome To Your Nepal Adventure!</div>
                        <div className="text-gray-400 text-sm relative z-10">The Mountains Are Calling And I Must Go. - John Muir</div>
                    </div>

                    <div className="col-span-3 grid grid-cols-2 gap-4">
                        <div className="bg-[#f5f5f5] p-4 rounded-3xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4"><i className="fa-chart-pie fa-solid mr-2"></i>BUDGET</h2>
                            <p>Total: <span className='font-bold'>18000</span></p>
                            <BudgetChart />
                        </div>

                        <div className="bg-[#f5f5f5] p-4 rounded-3xl shadow-sm">
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

                    <div className="col-span-2 bg-blue-100 p-4 rounded-3xl shadow-sm">
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

                    <div className="bg-[#f5f5f5] p-4 rounded-3xl shadow-sm lg:col-span-3 relative">
                        <h2 className="text-xl font-semibold mb-4"><i className="fa-location-crosshairs fa-solid mr-2"></i>DESTINATIONS</h2>
                        <GMap />
                    </div>

                    <div className="col-span-1 bg-amber-50 p-4 rounded-3xl shadow-sm lg:col-span-3">
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

                    <div className="col-span-2 bg-[#f5f5f5] p-4 rounded-3xl shadow-sm">
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
    )
}

export default Test