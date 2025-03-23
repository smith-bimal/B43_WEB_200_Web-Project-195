import React, { useState } from 'react';
import { Trash, Edit, Eye } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';

function Trips() {

    const [tripDetails, setTripDetails] = useState([]);
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
        <main className="min-h-screen p-8">
            <DashboardNavbar />
            <div className="p-8 mt-4 max-w-[1600px] mx-auto">
                {/* Hero Section */}
                <div className="bg-gray-800 p-8 rounded-3xl shadow-sm text-white mb-8 overflow-hidden relative h-[200px] flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-[2px] brightness-50"
                    />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
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
                                    className="border border-gray-200 p-3 pl-12 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSort("country")}
                                className="flex-1 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition text-gray-700 font-medium"
                            >
                                Country {sortField === "country" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                            </button>
                            <button
                                onClick={() => handleSort("startDate")}
                                className="flex-1 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition text-gray-700 font-medium"
                            >
                                Date {sortField === "startDate" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                            </button>
                        </div>
                        <button
                            onClick={handleAddTrip}
                            className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
                        >
                            <i className="fa-solid fa-plus text-sm"></i>
                            New Trip
                        </button>
                    </div>
                </div>

                {/* Trip Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentTrips.map((trip, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={trip.image || "https://source.unsplash.com/random/800x600/?travel"}
                                    alt={trip.country}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-blue-500/10 backdrop-blur-md text-blue-600 text-xs px-3 py-1.5 rounded-lg font-medium">
                                        Upcoming
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{trip.country}</h3>
                                <p className="text-gray-500 mb-4">{trip.state}</p>
                                <div className="flex justify-between items-center text-sm mb-4">
                                    <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600">
                                        <i className="fa-regular fa-calendar mr-2"></i>
                                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        <i className="fa-solid fa-dollar-sign mr-1"></i>
                                        {trip.cost}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewTrip(trip)}
                                        className="flex-1 bg-gray-800 text-white px-4 py-2.5 rounded-xl hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleEditTrip(trip)}
                                        className="bg-amber-50 p-2.5 rounded-xl hover:bg-amber-100 transition group"
                                    >
                                        <Edit className="w-4 h-4 text-amber-600 group-hover:text-amber-700" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTrip(trip)}
                                        className="bg-red-50 p-2.5 rounded-xl hover:bg-red-100 transition group"
                                    >
                                        <Trash className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {currentTrips.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <i className="fa-solid fa-suitcase-rolling text-4xl text-gray-400 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips found</h3>
                        <p className="text-gray-500 mb-6">Start planning your next adventure</p>
                        <button
                            onClick={handleAddTrip}
                            className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition inline-flex items-center gap-2"
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
                            className="bg-gray-800 text-white px-5 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition font-medium"
                        >
                            Previous
                        </button>
                        <span className="bg-gray-100 px-5 py-2.5 rounded-xl font-medium text-gray-800">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastTrip >= sortedTrips.length}
                            className="bg-gray-800 text-white px-5 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition font-medium"
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
                                    <span className="font-medium">${viewTrip.cost}</span>
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
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                                {editTrip ? 'Edit Trip' : 'Add New Trip'}
                            </h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="country"
                                    value={newTrip.country}
                                    onChange={handleInputChange}
                                    placeholder="Country"
                                    className="border border-gray-300 p-3 rounded-lg w-full"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={newTrip.state}
                                    onChange={handleInputChange}
                                    placeholder="State"
                                    className="border border-gray-300 p-3 rounded-lg w-full"
                                />
                                <input
                                    type="date"
                                    name="startDate"
                                    value={newTrip.startDate}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-3 rounded-lg w-full"
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    value={newTrip.endDate}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-3 rounded-lg w-full"
                                />
                                <input
                                    type="text"
                                    name="amount_spent"
                                    value={newTrip.amount_spent}
                                    onChange={handleInputChange}
                                    placeholder="Amount Spent"
                                    className="border border-gray-300 p-3 rounded-lg w-full"
                                />
                                <input
                                    type="text"
                                    name="image"
                                    value={newTrip.image}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="border border-gray-300 p-3 rounded-lg w-full"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={handleModalClose}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveTrip}
                                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                                >
                                    {editTrip ? 'Save Changes' : 'Create Trip'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Trips;
