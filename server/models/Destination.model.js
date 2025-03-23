const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        state: String,
        country: {
            type: String,
            required: true
        }
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);
