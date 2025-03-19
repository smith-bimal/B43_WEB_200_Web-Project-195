const mongoose = require('mongoose');

const packingSchema = new mongoose.Schema({
    item: String,
    hasTaken: {
        type: Boolean,
        default: false
    },
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: true
    }
});

const Packing = mongoose.model('Packing', packingSchema);

module.exports = Packing;