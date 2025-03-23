import React, { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const destinations = [
    {
      user: "605c72ef1532071a1b7b89c1",
      title: "Vacation in Bali",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-10"),
      description: "A relaxing vacation in Bali with family and friends.",
      amount_spent: 2500,
      status: "completed",
    },
    {
      user: "605c72ef1532071a1b7b89c1",
      title: "Business Trip to Paris",
      startDate: new Date("2025-07-15"),
      endDate: new Date("2025-07-20"),
      description: "Attend meetings and explore the city.",
      amount_spent: 1800,
      status: "completed",
    },
    {
      user: "605c72ef1532071a1b7b89c2",
      title: "Adventure Trip to Iceland",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2025-08-12"),
      description: "Hiking, glaciers, and geothermal springs in Iceland.",
      amount_spent: 3200,
      status: "completed",
    },
    {
      user: "605c72ef1532071a1b7b89c3",
      title: "Family Road Trip Across USA",
      startDate: new Date("2025-09-10"),
      endDate: new Date("2025-09-25"),
      description: "A fun-filled road trip across several cities in the USA.",
      amount_spent: 4000,
      status: "completed",
    },
    {
      user: "605c72ef1532071a1b7b89c4",
      title: "Romantic Getaway to Venice",
      startDate: new Date("2025-10-01"),
      endDate: new Date("2025-10-07"),
      description:
        "A romantic trip to Venice, exploring canals and local culture.",
      amount_spent: 1500,
      status: "completed",
    },
    {
      user: "605c72ef1532071a1b7b89c5",
      title: "Solo Trip to Japan",
      startDate: new Date("2025-11-05"),
      endDate: new Date("2025-11-15"),
      description: "Explore Tokyo and Kyoto on a solo adventure.",
      amount_spent: 2200,
      status: "completed",
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredDestinations = destinations.filter((destination) => {
    const isWithinDateRange =
      (!startDate || new Date(destination.startDate) >= new Date(startDate)) &&
      (!endDate || new Date(destination.endDate) <= new Date(endDate));

    return (
      destination.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      isWithinDateRange
    );
  });

  return (
    <div className="p-8">
      <DashboardNavbar />
      <div className="p-4 mt-8 mx-auto">
        <div className="bg-gray-800 p-6 rounded-3xl shadow-sm text-white mb-8 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1400"
            alt=""
            className="w-full -translate-x-1/2 -translate-y-1/2 absolute blur-[5px] brightness-50 left-1/2 top-1/2 z-0"
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-2">Travel Memories</h2>
            <p className="text-gray-300">
              Relive your past adventures and cherished moments
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search destinations..."
              className="border p-3 rounded-lg w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="relative">
              <input
                type="date"
                className="border p-3 rounded-lg w-full"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <span className="absolute text-xs text-gray-500 -top-2 left-3 bg-white px-2">
                Start Date
              </span>
            </div>
            <div className="relative">
              <input
                type="date"
                className="border p-3 rounded-lg w-full"
                value={endDate}
                onChange={handleEndDateChange}
              />
              <span className="absolute text-xs text-gray-500 -top-2 left-3 bg-white px-2">
                End Date
              </span>
            </div>
            <button className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition">
              Find Trips
            </button>
          </div>
        </div>

        <div className="mb-8">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-xl text-gray-600 mb-2">No destinations found</p>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.title}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        destination.image ||
                        "https://source.unsplash.com/random/800x600/?travel"
                      }
                      alt={destination.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {destination.title}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>
                        {new Date(destination.startDate).toLocaleDateString()}
                      </span>
                      <span className="font-medium">
                        ${destination.amount_spent}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                        View Details
                      </button>
                      <button className="flex-1 border-2 border-gray-800 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
