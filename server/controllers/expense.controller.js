const Expense = require('../models/Expense.model');
const Itinerary = require('../models/Itinerary.model');

exports.createExpense = async (req, res) => {
  const { title, amount, itinerary } = req.body;
  try {
    const expense = new Expense({ title, amount, itinerary });
    const savedExpense = await expense.save();

    // Fetch and update itinerary
    const itineraryDoc = await Itinerary.findById(itinerary);
    if (!itineraryDoc) {
      await Expense.findByIdAndDelete(savedExpense._id);
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itineraryDoc.expenses = [...itineraryDoc.expenses, savedExpense._id];
    await itineraryDoc.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ itinerary: req.query.itinerary });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Fetch and update itinerary
    const itinerary = await Itinerary.findById(expense.itinerary);
    if (itinerary) {
      itinerary.expenses = itinerary.expenses.filter(
        id => id.toString() !== expense._id.toString()
      );
      await itinerary.save();
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
