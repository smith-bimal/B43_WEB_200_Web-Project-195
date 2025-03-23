import React, { useState } from 'react';
import { Trash, Edit, Eye } from 'lucide-react';

function TripsCopy() {
  const initialTripDetails = [
    {
      user: "605c72ef1532071a1b7b89c1",
      title: "Vacation in Bali",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-10"),
      description: "A relaxing vacation in Bali with family and friends.",
      amount_spent: 2500,
      status: "pending",
      country: "Indonesia",
      state: "Bali",
      image: "https://example.com/bali-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c1",
      title: "Business Trip to Paris",
      startDate: new Date("2025-07-15"),
      endDate: new Date("2025-07-20"),
      description: "Attend meetings and explore the city.",
      amount_spent: 1800,
      status: "pending",
      country: "France",
      state: "Paris",
      image: "https://example.com/paris-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c2",
      title: "Adventure Trip to Iceland",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2025-08-12"),
      description: "Hiking, glaciers, and geothermal springs in Iceland.",
      amount_spent: 3200,
      status: "pending",
      country: "Iceland",
      state: "Reykjavik",
      image: "https://example.com/iceland-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c3",
      title: "Family Road Trip Across USA",
      startDate: new Date("2025-09-10"),
      endDate: new Date("2025-09-25"),
      description: "A fun-filled road trip across several cities in the USA.",
      amount_spent: 4000,
      status: "pending",
      country: "USA",
      state: "Various States",
      image: "https://example.com/usa-road-trip-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c4",
      title: "Romantic Getaway to Venice",
      startDate: new Date("2025-10-01"),
      endDate: new Date("2025-10-07"),
      description: "A romantic trip to Venice, exploring canals and local culture.",
      amount_spent: 1500,
      status: "pending",
      country: "Italy",
      state: "Venice",
      image: "https://example.com/venice-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c5",
      title: "Solo Trip to Japan",
      startDate: new Date("2025-11-05"),
      endDate: new Date("2025-11-15"),
      description: "Explore Tokyo and Kyoto on a solo adventure.",
      amount_spent: 2200,
      status: "pending",
      country: "Japan",
      state: "Tokyo/Kyoto",
      image: "https://example.com/japan-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c5",
      title: "Solo Trip to Japan",
      startDate: new Date("2025-11-05"),
      endDate: new Date("2025-11-15"),
      description: "Explore Tokyo and Kyoto on a solo adventure.",
      amount_spent: 2200,
      status: "pending",
      country: "Japan",
      state: "Tokyo/Kyoto",
      image: "https://example.com/japan-image.jpg",
    },
    {
      user: "605c72ef1532071a1b7b89c5",
      title: "Solo Trip to Japan",
      startDate: new Date("2025-11-05"),
      endDate: new Date("2025-11-15"),
      description: "Explore Tokyo and Kyoto on a solo adventure.",
      amount_spent: 2200,
      status: "pending",
      country: "Japan",
      state: "Tokyo/Kyoto",
      image: "https://example.com/japan-image.jpg",
    },
  ];
  

  const [tripDetails, setTripDetails] = useState(initialTripDetails);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('country');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({ country: '', state: '', startDate: '', endDate: '', cost: '', image: '' });
  const [viewTrip, setViewTrip] = useState(null);
  const [editTrip, setEditTrip] = useState(null);

  const tripsPerPage = 6;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const handleAddTrip = () => {
    setIsModalOpen(true);
    setEditTrip(null);
    setNewTrip({ country: '', state: '', startDate: '', endDate: '', cost: '', image: '' }); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTrip(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  const handleSaveTrip = () => {
    if (editTrip) {
      setTripDetails(
        tripDetails.map((trip) =>
          trip === editTrip ? { ...editTrip, ...newTrip } : trip
        )
      );
    } else {
      setTripDetails([...tripDetails, newTrip]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTrip = (tripToDelete) => {
    setTripDetails(tripDetails.filter((trip) => trip !== tripToDelete));
  };

  const handleViewTrip = (trip) => {
    setViewTrip(trip);
  };

  const handleEditTrip = (trip) => {
    setEditTrip(trip);
    setNewTrip(trip);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = months[month];
    return formattedDay + ' ' + formattedMonth;
  };

  const filteredTrips = tripDetails.filter((trip) =>
      trip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTrips = filteredTrips.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
  
    if (sortField === 'startDate') {
      return sortOrder === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }
  
    if (sortField === 'amount_spent') {
      const aCost = aValue;
      const bCost = bValue;
      return sortOrder === 'asc' ? aCost - bCost : bCost - aCost;
    }
  
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = sortedTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="p-8">
      <div className="p-4 mt-8 mx-auto">
        <div className="flex justify-center items-center mb-4 space-x-4">
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by country or state" className="border p-2 rounded" />
          <div className="flex space-x-2">
            <button onClick={() => handleSort("country")} className="bg-gray-800 p-2 rounded text-white">Sort by Country {sortField === "country" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</button>
            <button onClick={() => handleSort("state")} className="bg-gray-800 p-2 rounded text-white">Sort by State {sortField === "state" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</button>
            <button onClick={() => handleSort("startDate")} className="bg-gray-800 p-2 rounded text-white">Sort by Start Date {sortField === "startDate" ? sortOrder === "asc" ? "↑" : "↓" : ""}</button>
            <button onClick={() => handleSort("amount_spent")} className="bg-gray-800 p-2 rounded text-white">
              Sort by Cost {sortField === "amount_spent" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </button>
            <button onClick={() => handleAddTrip()} className="bg-gray-800 p-2 rounded text-white">Add Trip</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
          {currentTrips.map((trip, index) => {
            const startFormatted = formatDate(trip.startDate);
            const endFormatted = formatDate(trip.endDate);
            return (
              <div key={index} className="flex bg-white p-4 rounded-3xl shadow-lg items-center">
                <img src={trip.image} alt={trip.country} className="bg-white h-32 rounded-2xl shadow-2xl w-32 mr-4 object-cover" />
                <div className="flex flex-col">
                  <div className="text-xl font-semibold">{trip.country}, {trip.state}</div>
                  <div className="text-gray-500 text-sm mb-2">{startFormatted} - {endFormatted}</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleViewTrip(trip)} className="bg-green-300 rounded text-white px-4 py-2"><Eye className="h-5 w-5" /></button>
                    <button onClick={() => handleDeleteTrip(trip)} className="bg-red-300 rounded text-white px-4 py-2"><Trash className="h-5 w-5" /></button>
                    <button onClick={() => handleEditTrip(trip)} className="bg-yellow-300 rounded text-white px-4 py-2"><Edit className="h-5 w-5" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center mt-4 space-x-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-800 rounded text-white px-4 py-2">Previous</button>
          <span className="text-lg font-semibold">{currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedTrips.length / tripsPerPage)} className="bg-gray-800 rounded text-white px-4 py-2">Next</button>
        </div>

        {viewTrip && (
          <div className="flex justify-center backdrop-blur-2xl backdrop-opacity-30 fixed inset-0 items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">{viewTrip.country}, {viewTrip.state}</h2>
              <img src={viewTrip.image} alt={viewTrip.country} className="h-32 rounded-2xl w-32 mb-4 object-cover" />
              <p className="text-sm mb-2"><strong>Start Date:</strong> {formatDate(viewTrip.startDate)}</p>
              <p className="text-sm mb-2"><strong>End Date:</strong> {formatDate(viewTrip.endDate)}</p>
              <p className="text-sm mb-2"><strong>Cost:</strong> {viewTrip.cost}</p>
              <div className="flex justify-end">
                <button onClick={() => setViewTrip(null)} className="bg-gray-300 rounded-lg text-white px-6 py-3">Close</button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="flex justify-center backdrop-blur-2xl backdrop-opacity-30 fixed inset-0 items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-4">{editTrip ? 'Edit Trip' : 'Add New Trip'}</h2>
              </div>
              <div className="space-y-4">
                <input type="text" name="country" value={newTrip.country} onChange={handleInputChange} placeholder="Country" className="border border-gray-300 p-3 rounded-lg w-full" />
                <input type="text" name="state" value={newTrip.state} onChange={handleInputChange} placeholder="State" className="border border-gray-300 p-3 rounded-lg w-full" />
                <input type="date" name="startDate" value={newTrip.startDate} onChange={handleInputChange} className="border border-gray-300 p-3 rounded-lg w-full" />
                <input type="date" name="endDate" value={newTrip.endDate} onChange={handleInputChange} className="border border-gray-300 p-3 rounded-lg w-full" />
                <input type="text" name="amount_spent" value={newTrip.amount_spent} onChange={handleInputChange} placeholder="Amount Spent" className="border border-gray-300 p-3 rounded-lg w-full"/>
                <input type="text" name="image" value={newTrip.image} onChange={handleInputChange} placeholder="Image URL" className="border border-gray-300 p-3 rounded-lg w-full" />
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={handleModalClose} className="bg-gray-200 rounded-lg text-gray-700 px-6 py-3">Cancel</button>
                <button onClick={handleSaveTrip} className="bg-blue-500 rounded-lg text-white px-6 py-3">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default TripsCopy;
