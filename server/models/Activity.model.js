const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: String,
    type: String,
    date: Date,
    descriptions: [String],
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary'
    },
    order: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);
