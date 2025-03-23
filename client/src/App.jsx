import { Routes, Route } from 'react-router';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Archive from './pages/Archive';
import Archives from './pages/Archives';
import Trips from './pages/Trips';
import Test from './pages/Test';
import TripsCopy from './pages/TripsCopy';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/register" element={<Auth isLogin={false} />} />
        {/* <Route path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
          } />
          <Route path="/trips" element={
            <ProtectedRoute>
            <Trips />
            </ProtectedRoute>
            } />
            <Route path="/archive" element={
              <ProtectedRoute>
              <Archive />
              </ProtectedRoute>
              } /> */}
        <Route path="/test" element={<Test />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
