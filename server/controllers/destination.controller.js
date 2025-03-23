const Destination = require('../models/Destination.model');
const Itinerary = require('../models/Itinerary.model');

exports.createDestination = async (req, res) => {
  const { name, location, itinerary, coordinates } = req.body;
  try {
    const destination = new Destination({ name, location, itinerary, coordinates });
    await destination.save();

    // Add destination to itinerary's destinations array
    await Itinerary.findByIdAndUpdate(
      itinerary,
      { $push: { destinations: destination._id } }
    );

    res.status(201).json(destination);
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
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
