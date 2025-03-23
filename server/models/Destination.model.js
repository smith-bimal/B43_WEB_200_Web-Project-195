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
        ref: 'Itinerary',
        required: true
    },
}, { timestamps: true });

// Add compound index
DestinationSchema.index({ itinerary: 1, name: 1 });

module.exports = mongoose.model('Destination', DestinationSchema);
