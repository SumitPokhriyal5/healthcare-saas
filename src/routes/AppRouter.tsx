import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import NotificationsBootstrap from '@lib/notifications/NotificationsBootstrap';
import { RouteFallback } from '@shared/components/RouteFallback';

const LoginPage = lazy(() => import('@modules/auth/LoginPage'));
const DashboardPage = lazy(() => import('@modules/dashboard/DashboardPage'));
const AnalyticsPage = lazy(() => import('@modules/analytics/AnalyticsPage'));
const PatientsPage = lazy(() => import('@modules/patients/PatientsPage'));
const SignupPage = lazy(() => import('@modules/auth/SignupPage'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NotificationsBootstrap>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/patients/:id" element={<PatientsPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </NotificationsBootstrap>
    </BrowserRouter>
  );
}
