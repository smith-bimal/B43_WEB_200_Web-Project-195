const Itinerary = require('../models/Itinerary.model');
const Activity = require('../models/Activity.model');
const Expense = require('../models/Expense.model');
const Destination = require('../models/Destination.model');
const Packing = require('../models/Packing.model');

exports.createItinerary = async (req, res) => {
  try {
    const itinerary = new Itinerary(req.body);
    itinerary.user = req.userId;
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.userId })
      .populate('activities')
      .populate('destination')
      .populate('expenses')
      .populate('packings')
      .populate('user')
      .populate('collaborators');
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItinerary = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.startDate) updates.startDate = new Date(updates.startDate);
    if (updates.endDate) updates.endDate = new Date(updates.endDate);

    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updates,
      { new: true }
    );

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });

    if (itinerary.destination) {
      await Destination.findByIdAndDelete(itinerary.destination);
    }

    await Activity.deleteMany({ itinerary: itinerary._id });
    await Expense.deleteMany({ itinerary: itinerary._id });
    await Packing.deleteMany({ itinerary: itinerary._id });

    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Itinerary and all associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFullItineraryData = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('user')
      .populate('destination')
      .populate('activities')
      .populate('expenses')
      .populate('packings')
      .populate('collaborators');

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // Check if user has access to this itinerary
    if (itinerary.user._id.toString() !== req.userId &&
      !itinerary.collaborators.find(c => c._id.toString() === req.userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
