const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  profilePic: String,
  travelHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary'
  }],
});

module.exports = mongoose.model('User', UserSchema);
