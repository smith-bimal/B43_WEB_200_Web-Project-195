const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);
