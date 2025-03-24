import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
