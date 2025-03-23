const Itinerary = require('../models/Itinerary.model');

async function updateItineraryStatuses() {
  try {
    const currentDate = new Date();

    const itineraries = await Itinerary.find({
      $or: [
        { status: 'pending' },
        { status: 'active' }
      ]
    });

    let updatedCount = 0;
    for (const itinerary of itineraries) {
      const oldStatus = itinerary.status;
      itinerary.updateStatusBasedOnDates();
      
      if (oldStatus !== itinerary.status) {
        await itinerary.save();
        updatedCount++;
      }
    }

    console.log(`Updated ${updatedCount} itineraries status`);
  } catch (error) {
    console.error('Error updating itinerary statuses:', error);
  }
}

module.exports = updateItineraryStatuses;
