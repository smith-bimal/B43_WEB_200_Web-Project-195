# TripMate - A Personalized Travel Planner

## Introduction
TripMate is a comprehensive travel planning application that helps users organize and manage their trips efficiently. The application provides features for creating itineraries, managing expenses, tracking activities, and maintaining packing lists. It offers an intuitive interface for planning both upcoming and ongoing trips while keeping an archive of past travels.

## Project Type
Fullstack

## Deployed App
Frontend: https://tripmate-sand.vercel.app
Backend: https://tripmate-vxag.onrender.com
Database: MongoDB Atlas

## Directory Structure
```
tripmate/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── config/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
```

## Video Walkthrough of the project
[Check the Video](https://youtu.be/NhqkFamklek)

## Features
- **User Authentication**
  - Secure signup and login functionality
  - JWT-based authentication
  - Profile management

- **Trip Management**
  - Create, view, update, and delete trips
  - Set trip dates and destinations
  - Track trip status (pending, active, completed)
  - Google Maps integration for destination visualization

- **Budget Tracking**
  - Set trip budgets
  - Record and categorize expenses
  - Visual budget analysis through charts
  - Track remaining budget

- **Activity Planning**
  - Create and manage daily activities
  - Add detailed descriptions for each activity
  - Organize activities by dates
  - Edit and delete functionality

- **Packing List**
  - Create customizable packing lists
  - Check off packed items
  - Edit and delete items
  - Track packing progress

- **Trip Archive**
  - View completed trips
  - Recreate past trips for similar destinations
  - Maintain travel history

- **PDF Export**
  - Generate trip details in PDF format
  - Include activities, expenses, and packing lists
  - Offline access to trip information

## Design Decisions & Assumptions
1. **Authentication**
   - Uses JWT for stateless authentication
   - Tokens stored in localStorage for persistence

2. **Data Structure**
   - MongoDB for flexible document storage
   - Separate collections for users, itineraries, activities, expenses
   - References between collections for data relationships

3. **UI/UX**
   - Mobile-first responsive design
   - Interactive components with immediate feedback
   - Real-time updates for collaborative features

4. **State Management**
   - React hooks for local state
   - Custom hooks for shared functionality
   - Context API for global state (auth)

## Installation & Getting Started
1. Clone the repository
```bash
git clone https://github.com/smith-bimal/B43_WEB_200_Web-Project-195.git
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# Server .env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000

# Client .env
VITE_GOOGLE_MAP_API_KEY=your_google_maps_api_key
```

4. Start the application
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## Credentials
```json
{
  "demo_user": {
    "email": "demo@tripmate.com",
    "password": "demo123"
  }
}
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

### Itineraries
- GET /api/itineraries - Get all itineraries
- POST /api/itineraries - Create new itinerary
- GET /api/itineraries/:id - Get specific itinerary
- PUT /api/itineraries/:id - Update itinerary
- DELETE /api/itineraries/:id - Delete itinerary

### Activities
- GET /api/activities - Get all activities
- POST /api/activities - Create new activity
- PUT /api/activities/:id - Update activity
- DELETE /api/activities/:id - Delete activity

### Expenses
- GET /api/expenses - Get all expenses
- POST /api/expenses - Add new expense
- PUT /api/expenses/:id - Update expense
- DELETE /api/expenses/:id - Delete expense

### Packing List
- GET /api/packing/:itineraryId - Get packing list
- POST /api/packing - Add packing item
- PUT /api/packing/:id - Update packing item
- DELETE /api/packing/:id - Delete packing item

## Technology Stack
### Frontend
- React (Vite)
- TailwindCSS
- @mui/x-charts
- @react-google-maps/api
- @react-pdf/renderer
- react-day-picker
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

### DevOps
- Git & GitHub
- Vercel (Frontend hosting)
- Render (Backend hosting)
- MongoDB Atlas (Database)
