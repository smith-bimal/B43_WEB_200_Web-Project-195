import React, { useState } from "react";
import { Eye, RefreshCw } from 'lucide-react';
import DashboardNavbar from "../components/DashboardNavbar";
import { useItineraryData } from '../hooks/useItineraryData';
import AddNewTripModal from '../components/AddNewTripModal';

const Archive = () => {
  const { data: allTrips, refresh } = useItineraryData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState('country');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewTrip, setViewTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const tripsPerPage = 6;

  const handleRecreateTrip = (trip) => {
    setSelectedTrip({
      ...trip,
      status: 'pending',
      startDate: '',
      endDate: ''
    });
    setIsModalOpen(true);
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
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

  // Filter only completed trips
  const completedTrips = (allTrips || []).filter(trip =>
    trip.status === 'completed'
  );

  // Update search filter to include dates
  const searchFilteredTrips = searchQuery
    ? completedTrips.filter(trip => {
      const searchLower = searchQuery.toLowerCase();
      const startDateStr = formatDate(trip.startDate).toLowerCase();
      const endDateStr = formatDate(trip.endDate).toLowerCase();

      return (
        trip.title?.toLowerCase().includes(searchLower) ||
        trip.destination?.name?.toLowerCase().includes(searchLower) ||
        trip.destination?.location?.city?.toLowerCase().includes(searchLower) ||
        trip.destination?.location?.state?.toLowerCase().includes(searchLower) ||
        trip.destination?.location?.country?.toLowerCase().includes(searchLower) ||
        startDateStr.includes(searchLower) ||
        endDateStr.includes(searchLower)
      );
    })
    : completedTrips;

  // Sort the filtered trips
  const sortedTrips = [...searchFilteredTrips].sort((a, b) => {
    if (sortField === 'country') {
      const aCountry = a.destination?.location?.country || '';
      const bCountry = b.destination?.location?.country || '';
      return sortOrder === 'asc'
        ? aCountry.localeCompare(bCountry)
        : bCountry.localeCompare(aCountry);
    }

    if (sortField === 'startDate') {
      const aDate = new Date(a.startDate);
      const bDate = new Date(b.startDate);
      return sortOrder === 'asc'
        ? aDate - bDate
        : bDate - aDate;
    }

    return 0;
  });

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = sortedTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-8">
      <DashboardNavbar />
      <div className="sm:p-4 md:p-8 mt-4 mx-auto">
        <div className="bg-gray-800 p-4 md:p-8 rounded-3xl shadow-sm text-white mb-8 overflow-hidden relative h-[200px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1400"
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-[2px] brightness-50"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <i className="fa-solid fa-plane-departure text-2xl"></i>
              </div>
              <h2 className="text-3xl font-semibold">Travel Memories</h2>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl">
              Relive your past adventures and cherished moments
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your trips..."
                  className="border border-gray-200 p-3 pl-12 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort("country")}
                className="flex-1 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition text-gray-700 font-medium whitespace-nowrap"
              >
                Country {sortField === "country" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </button>
              <button
                onClick={() => handleSort("startDate")}
                className="flex-1 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition text-gray-700 font-medium whitespace-nowrap"
              >
                Date {sortField === "startDate" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </button>
            </div>
            <div className="relative">
              {/* Remove the Find Trips button as it's not needed */}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {currentTrips.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <i className="fa-solid fa-book text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No completed trips found</h3>
            <p className="text-gray-500">Your travel memories will appear here once you complete a trip</p>
          </div>
        )}

        {/* Trip Cards Grid - Only show if there are trips */}
        {currentTrips.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentTrips.map((trip) => (
                <div key={trip._id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {trip.destination?.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    <p className='text-gray-500'>{trip.destination?.location?.state}, {trip.destination?.location?.country}</p>
                    <small className="text-gray-800 mb-4 bg-blue-100 px-4 py-2 rounded-full my-2 inline-block">
                      {trip.title}
                    </small>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span className="bg-gray-100 px-3 py-1.5 rounded-lg">
                        <i className="fa-regular fa-calendar mr-2"></i>
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                      <span className="font-medium">
                        <i className="fa-solid fa-dollar-sign mr-1"></i>
                        {trip.budget}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewTrip(trip)}
                        className="flex-1 bg-gray-800 text-white px-4 py-2.5 rounded-full hover:bg-gray-700 transition flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleRecreateTrip(trip)}
                        className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-full hover:bg-blue-100 transition"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Recreate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-800 text-white px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition font-medium"
              >
                Prev
              </button>
              <span className="bg-gray-100 px-5 py-2.5 rounded-full font-medium text-gray-800">
                {currentPage}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastTrip >= sortedTrips.length}
                className="bg-gray-800 text-white px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition font-medium"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Add Trip Modal with pre-filled data */}
        {isModalOpen && (
          <AddNewTripModal
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTrip(null);
              refresh();
            }}
            initialData={selectedTrip}
          />
        )}

        {/* ...existing view trip modal code... */}
      </div>
    </div>
  );
};

export default Archive;
