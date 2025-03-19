import React from 'react'

const Test = () => {
    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
                        Discover
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full">
                        Dashboard
                    </button>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
                        Your Trips
                    </button>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
                        Archive
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">
                        New Trip
                    </button>
                </div>
                <div className="flex space-x-4 items-center">
                    <i className="fas fa-bell text-xl"></i>
                    <i className="fas fa-user-circle text-xl"></i>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">YOUR TRIP</h2>
                        <span className="bg-gray-700 text-white px-2 py-1 rounded-full">Nepal</span>
                    </div>
                    <div className="text-2xl font-bold mb-2">Hey Ashik! 👋</div>
                    <div className="text-lg">Welcome To Your Nepal Adventure!</div>
                    <div className="text-sm text-gray-400">The Mountains Are Calling And I Must Go. - John Muir</div>
                    <img alt="Mountain scenery" className="mt-4 rounded-lg" src="https://placehold.co/600x200" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">BUDGET</h2>
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                                <div className="text-2xl font-bold">70%</div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gray-900"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">EXPENSES</h2>
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
                <div className="bg-yellow-500 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">READINESS</h2>
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                                <div className="text-2xl font-bold">17</div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gray-900"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">Days left</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg col-span-1 lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">DESTINATIONS</h2>
                    <img alt="Map with destinations" className="rounded-lg" src="https://placehold.co/600x400" />
                    <ul className="mt-4 space-y-2">
                        <li>Kathmandu</li>
                        <li>Pokhara</li>
                        <li>Chitwan</li>
                        <li>Everest</li>
                    </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">KATHMANDU</h2>
                    <div className="text-3xl font-bold">13°</div>
                    <div className="text-sm text-gray-400">Temperature</div>
                    <div className="text-sm text-gray-400">H10° L4° C</div>
                    <div className="text-sm text-gray-400">Weather</div>
                    <div className="text-sm text-gray-400">Mostly cloudy</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">FLIGHT</h2>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span>12 May, 2:30PM</span>
                            <span>Dhaka</span>
                            <span>Kathmandu</span>
                        </li>
                        <li className="flex justify-between">
                            <span>22 May, 9:30AM</span>
                            <span>Kathmandu</span>
                            <span>Delhi</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">PACKING LIST</h2>
                    <ul className="space-y-2">
                        <li>Backpack</li>
                        <li>Camera &amp; GoPro</li>
                        <li>Laptop &amp; Charger</li>
                        <li>Hot water button</li>
                        <li>Medical Aid</li>
                        <li>Winter Jacket</li>
                    </ul>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-full mt-4">New Reminder</button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg col-span-1 lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">DAYS &amp; ACTIVITY</h2>
                    <ul className="space-y-2">
                        <li>
                            <strong>Day 1:</strong> Arrival in Kathmandu
                        </li>
                        <li className="text-sm text-gray-400">
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
            </div>
        </div>
    )
}

export default Test