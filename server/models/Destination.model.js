const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: String,
    location: {
        state: String,
        country: String
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);
