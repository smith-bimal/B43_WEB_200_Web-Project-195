import { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import instance from '../config/axios';
import { addDestination, addItinerary } from '../hooks/useApiCalls';
import { getTripStatus } from '../utils/tripStatus';
import { useNavigate } from 'react-router';

const libraries = ["places"];

const AddNewTripModal = ({ onClose }) => {
    const [searchBox, setSearchBox] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        destination: '',
        coordinates: { latitude: 0, longitude: 0 },
        location: {
            state: '',
            country: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onPlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places.length === 0) return;

            const place = places[0];
            if (!place.geometry) {
                setError('No location data for this place');
                return;
            }

            // Extract location components
            let state = '', country = '';
            place.address_components.forEach(component => {
                if (component.types.includes('administrative_area_level_1')) {
                    state = component.long_name;
                }
                if (component.types.includes('country')) {
                    country = component.long_name;
                }
            });

            setFormData(prev => ({
                ...prev,
                destination: place.formatted_address,
                coordinates: {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                },
                location: { state, country }
            }));
        }
    };

    const onLoad = ref => setSearchBox(ref);
    const onUnmount = () => setSearchBox(null);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Calculate initial status based on dates
            const status = getTripStatus(formData.startDate, formData.endDate);

            // Create the itinerary with status
            const itineraryResponse = await addItinerary({
                title: formData.title,
                description: formData.description,
                startDate: formData.startDate,
                endDate: formData.endDate,
                budget: parseFloat(formData.budget),
                status
            });

            // Then create the destination
            const destinationResponse = await addDestination({
                name: formData.destination,
                location: formData.location,
                coordinates: formData.coordinates,
                itinerary: itineraryResponse.data._id
            });

            // Update the itinerary with the destination
            await instance.put(`/itineraries/${itineraryResponse.data._id}`, {
                destination: destinationResponse.data._id
            });

            onClose();
            navigate('/trips');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0005] backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Create New Trip</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fa-times fa-solid"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Destination</label>
                        <div className="relative">
                            <LoadScript
                                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                                libraries={libraries}
                            >
                                <StandaloneSearchBox
                                    onLoad={onLoad}
                                    onPlacesChanged={onPlacesChanged}
                                    onUnmount={onUnmount}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search for a city..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-200 outline-none"
                                        required
                                    />
                                </StandaloneSearchBox>
                            </LoadScript>
                            {formData.destination && (
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Selected: {formData.destination}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Trip Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Give your trip a name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-200 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="What's this trip about?"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-200 outline-none"
                            rows="3"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Start Date</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-200 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">End Date</label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-200 outline-none"
                                required
                                min={formData.startDate}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Budget ($)</label>
                        <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                            placeholder="Enter your budget"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-200 outline-none"
                            required
                            min="0"
                        />  
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-[#1E2939] text-white hover:bg-[#2a3749] disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Trip'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewTripModal;