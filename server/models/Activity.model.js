const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  date: { type: Date, required: true },
  descriptions: [{ type: String }],
  destination: String,
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
