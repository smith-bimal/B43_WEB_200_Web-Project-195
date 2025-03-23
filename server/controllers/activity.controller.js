const Activity = require('../models/Activity.model');
const Itinerary = require('../models/Itinerary.model');

exports.createActivity = async (req, res) => {
  const { name, type, date, destination, itinerary, descriptions } = req.body;
  try {
    // Ensure descriptions is always an array
    const desc = Array.isArray(descriptions) ? descriptions : [];

    const activity = new Activity({
      name,
      type,
      date,
      destination,
      itinerary,
      descriptions: desc
    });
    await activity.save();

    // Add activity to itinerary's activities array
    await Itinerary.findByIdAndUpdate(
      itinerary,
      { $push: { activities: activity._id } }
    );

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ itinerary: req.query.itinerary }).sort({ date: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { name, date, descriptions } = req.body;

    // Ensure descriptions is always an array
    const desc = Array.isArray(descriptions) ? descriptions : [];

    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        name,
        date,
        descriptions: desc
      },
      { new: true }
    );

    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
