const Destination = require('../models/Destination.model');
const Itinerary = require('../models/Itinerary.model');

exports.createDestination = async (req, res) => {
  const { name, location, coordinates, itinerary } = req.body;
  try {
    const destination = new Destination({ name, location, coordinates, itinerary });
    const savedDestination = await destination.save();

    // Fetch and update itinerary
    const itineraryDoc = await Itinerary.findById(itinerary);
    if (!itineraryDoc) {
      await Destination.findByIdAndDelete(savedDestination._id);
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itineraryDoc.destination = savedDestination._id;
    await itineraryDoc.save();

    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDestinations = async (req, res) => {
  try {
    if (!req.query.itinerary) {
      return res.status(400).json({ message: 'Itinerary ID is required' });
    }

    const destinations = await Destination.find({ itinerary: req.query.itinerary })
      .populate({
        path: 'itinerary',
        select: 'title startDate endDate'
      })
      .lean()
      .exec();

    if (!destinations || destinations.length === 0) {
      return res.status(404).json({ message: 'No destinations found' });
    }

    res.json(destinations);
  } catch (error) {
    console.error('Destinations fetch error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate({
        path: 'itinerary',
        select: 'title startDate endDate'
      })
      .exec();

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(destination);
  } catch (error) {
    console.error('Destination fetch error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Fetch and update itinerary
    const itinerary = await Itinerary.findById(destination.itinerary);
    if (itinerary) {
      itinerary.destination = null; // Remove the destination reference
      await itinerary.save();
    }

    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
