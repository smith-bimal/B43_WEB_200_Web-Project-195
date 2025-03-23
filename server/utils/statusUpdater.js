const Itinerary = require('../models/Itinerary.model');

async function updateItineraryStatuses() {
  try {
    const itineraries = await Itinerary.find({
      status: { $ne: 'completed' },
      endDate: { $lte: new Date() }
    });

    for (const itinerary of itineraries) {
      itinerary.status = 'completed';
      await itinerary.save();
    }
    console.log(`Updated ${itineraries.length} itineraries to completed status`);
  } catch (error) {
    console.error('Error updating itinerary statuses:', error);
  }
}

module.exports = updateItineraryStatuses;
