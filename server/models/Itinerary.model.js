const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  startDate: Date,
  endDate: Date,
  description: String,
  amount_spent: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }],
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
