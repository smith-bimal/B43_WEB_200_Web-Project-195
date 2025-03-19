const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: String,
    location: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary'
    },
});

module.exports = mongoose.model('Destination', DestinationSchema);
