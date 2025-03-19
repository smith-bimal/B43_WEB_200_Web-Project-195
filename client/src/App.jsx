import { Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Itinerary from './pages/Itinerary';
import Test from './pages/Test';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Auth isLogin={true} />} />
    //   <Route path="/register" element={<Auth isLogin={false} />} />
    //   <Route path="/dashboard" element={<Dashboard />} />
    //   <Route path="/itinerary/:id" element={<Itinerary />} />
    // </Routes>
    <Test />
  );
}

export default App;
