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
  budget: {
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

// Add a pre-save middleware to update amount_spent
ItinerarySchema.pre('save', async function(next) {
  if (this.isModified('expenses')) {
    const Expense = mongoose.model('Expense');
    const expenses = await Expense.find({ _id: { $in: this.expenses } });
    this.amount_spent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
  next();
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
