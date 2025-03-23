import React, { useState } from 'react';
import { Trash, Edit, Eye } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import AddNewTripModal from '../components/AddNewTripModal';
import { deleteItinerary } from '../hooks/useApiCalls';
import { useItineraryData } from '../hooks/useItineraryData';

function Trips() {
    const { data: allTrips, loading, error, refresh } = useItineraryData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('country');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewTrip, setViewTrip] = useState(null);

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
    };

    const handleDeleteTrip = async (trip) => {
        try {
            await deleteItinerary(trip._id);
            refresh();
            console.log("🗑️ Itinerary deleted successfully")
        } catch (error) {
            console.log("❌ Failed to delete itinerary.", error)
        }
    };

    const handleViewTrip = (trip) => {
        setViewTrip(trip);
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

    // First, filter active and pending trips
    const activeAndPendingTrips = (allTrips || []).filter(trip =>
        trip.status === 'active' || trip.status === 'pending'
    );

    // Then, apply search filter if there's a search query
    const searchFilteredTrips = searchQuery
        ? activeAndPendingTrips.filter(trip => {
            const searchLower = searchQuery.toLowerCase();
            const startDate = formatDate(trip.startDate).toLowerCase();
            const endDate = formatDate(trip.endDate).toLowerCase();

            return (
                trip.title?.toLowerCase().includes(searchLower) ||
                trip.destination?.name?.toLowerCase().includes(searchLower) ||
                trip.destination?.location?.city?.toLowerCase().includes(searchLower) ||
                trip.destination?.location?.state?.toLowerCase().includes(searchLower) ||
                trip.destination?.location?.country?.toLowerCase().includes(searchLower) ||
                startDate.includes(searchLower) ||
                endDate.includes(searchLower)
            );
        })
        : activeAndPendingTrips;

    // Finally, sort the filtered trips
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
        <main className="min-h-screen p-8">
            <DashboardNavbar />
            <div className="p-8 mt-4 mx-auto">
                {/* Hero Section */}
                <div className="bg-gray-800 p-8 rounded-3xl shadow-sm text-white mb-8 overflow-hidden relative h-[200px] flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-[2px] brightness-50"
                    />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                                <i className="fa-solid fa-plane-departure text-2xl"></i>
                            </div>
                            <h2 className="text-3xl font-semibold">Your Travel Plans</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-2xl">
                            Organize and manage your upcoming adventures with ease
                        </p>
                    </div>
                </div>

                {/* Search and Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search your trips..."
                                    className="border border-gray-200 p-3 pl-12 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSort("country")}
                                className="flex-1 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition text-gray-700 font-medium"
                            >
                                Country {sortField === "country" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                            </button>
                            <button
                                onClick={() => handleSort("startDate")}
                                className="flex-1 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition text-gray-700 font-medium"
                            >
                                Date {sortField === "startDate" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                            </button>
                        </div>
                        <button
                            onClick={handleAddTrip}
                            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
                        >
                            <i className="fa-solid fa-plus text-sm"></i>
                            New Trip
                        </button>
                    </div>
                </div>

                {/* Show loading state */}
                {loading && (
                    <div className="text-center py-16">
                        <p>Loading trips...</p>
                    </div>
                )}

                {/* Show error state */}
                {error && (
                    <div className="text-center py-16 text-red-600">
                        <p>Error loading trips: {error}</p>
                    </div>
                )}

                {/* Trip Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {currentTrips.map((trip) => {
                        return (
                            <div key={trip._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                                <div className="absolute top-4 right-4">
                                    <span className={`backdrop-blur-md text-xs px-3 py-1.5 rounded-lg font-medium ${trip.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'
                                        }`}>
                                        {trip.status === 'active' ? 'Active' : 'Upcoming'}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                        {trip.destination?.name.split(",")[0]}
                                    </h3>
                                    <p className='text-gray-500'>{trip.destination?.location?.state}, {trip.destination?.location?.country}</p>
                                    <small className="text-gray-800 mb-4 bg-blue-100 px-4 py-2 rounded-full my-2 inline-block">{trip.title}</small>
                                    <div className="flex justify-between items-center text-sm mb-4">
                                        <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600">
                                            <i className="fa-regular fa-calendar mr-2"></i>
                                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            <i className="fa-solid fa-dollar-sign mr-1"></i>
                                            {trip.budget}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewTrip(trip)}
                                            className="flex-1 bg-gray-800 text-white px-4 py-2.5 rounded-full hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTrip(trip)}
                                            className="bg-red-50 p-2.5 rounded-full hover:bg-red-100 transition group"
                                        >
                                            <Trash className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {currentTrips.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <i className="fa-solid fa-suitcase-rolling text-4xl text-gray-400 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips found</h3>
                        <p className="text-gray-500 mb-6">Start planning your next adventure</p>
                        <button
                            onClick={handleAddTrip}
                            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition inline-flex items-center gap-2"
                        >
                            <i className="fa-solid fa-plus"></i>
                            Add New Trip
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {currentTrips.length > 0 && (
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
                )}

                {/* Modal styling updates */}
                {viewTrip && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
                            <div className="relative h-48 -mx-8 -mt-8 mb-4 rounded-t-2xl overflow-hidden">
                                <img
                                    src={viewTrip.image || "https://source.unsplash.com/random/800x600/?travel"}
                                    alt={viewTrip.country}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4">{viewTrip.country}</h2>
                            <p className="text-gray-600 mb-6">{viewTrip.state}</p>
                            <div className="space-y-2 mb-6">
                                <p className="flex justify-between">
                                    <span className="text-gray-600">Start Date:</span>
                                    <span className="font-medium">{formatDate(viewTrip.startDate)}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-gray-600">End Date:</span>
                                    <span className="font-medium">{formatDate(viewTrip.endDate)}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-gray-600">Total Cost:</span>
                                    <span className="font-medium">${viewTrip.budget}</span>
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setViewTrip(null)}
                                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Trip Modal */}
                {isModalOpen && (
                    <AddNewTripModal onClose={() => {
                        setIsModalOpen(false);
                        refresh(); // Refresh the data after adding new trip
                    }} />
                )}
            </div>
        </main>
    );
}

export default Trips;
