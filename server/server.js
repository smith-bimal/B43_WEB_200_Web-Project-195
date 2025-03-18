require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const app = express();

console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/itineraries', require('./routes/itinerary.routes'));
app.use('/api/destinations', require('./routes/destination.routes'));
app.use('/api/activities', require('./routes/activity.routes'));
app.use('/api/expenses', require('./routes/expense.routes'));

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
}) 
