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
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  packings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Packing'
  }],
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

// Method to check and update status based on dates
ItinerarySchema.methods.updateStatusBasedOnDates = function() {
  const currentDate = new Date();
  if (this.endDate && currentDate > this.endDate) {
    this.status = 'completed';
  } else if (this.startDate && currentDate >= this.startDate && currentDate <= this.endDate) {
    this.status = 'active';
  }
};

// Add a pre-save middleware to update amount_spent and status
ItinerarySchema.pre('save', async function (next) {
  // Update status based on dates
  this.updateStatusBasedOnDates();
  
  // Existing expense calculation logic
  if (this.isModified('expenses')) {
    const Expense = mongoose.model('Expense');
    const expenses = await Expense.find({ _id: { $in: this.expenses } });
    this.amount_spent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
  next();
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
