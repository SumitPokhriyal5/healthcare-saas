import { Navigate, Outlet } from 'react-router-dom';
import { tempAuth } from '@lib/store/tempAuth';

export default function ProtectedRoute() {
  if (!tempAuth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
