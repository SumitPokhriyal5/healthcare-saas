import { Navigate, Outlet } from 'react-router-dom';
import { tempAuth } from '@lib/store/tempAuth';

export default function PublicOnlyRoute() {
  if (tempAuth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
