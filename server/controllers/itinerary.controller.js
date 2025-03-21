const Itinerary = require('../models/Itinerary.model');
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
    const itineraries = await Itinerary.find({ user: req.userId });
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
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFullItineraryData = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('user')
      .populate('destinations')
      .populate('activities')
      .populate('expenses')
      .populate('collaborators');

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // Check if user has access to this itinerary
    if (itinerary.user._id.toString() !== req.userId && 
        !itinerary.collaborators.find(c => c._id.toString() === req.userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Also fetch packing items
    const packingItems = await Packing.find({ itinerary: itinerary._id });

    res.json({
      ...itinerary.toObject(),
      packingItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
