require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const cron = require('node-cron');
const updateItineraryStatuses = require('./utils/statusUpdater');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/itineraries', require('./routes/itinerary.routes'));
app.use('/api/destinations', require('./routes/destination.routes'));
app.use('/api/activities', require('./routes/activity.routes'));
app.use('/api/expenses', require('./routes/expense.routes'));
app.use('/api/packing', require('./routes/packing.routes'));

// Run the status update every day at midnight
cron.schedule('0 0 * * *', () => {
  updateItineraryStatuses();
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
