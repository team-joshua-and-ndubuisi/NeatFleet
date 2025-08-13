import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import LoadingPage from '@/pages/LoadingPage';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import { AuthGuard, GuestGuard } from '@/features/auth';

const SignupPage = lazy(() => import('@/pages/SignupPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ServiceCatalogPage = lazy(() => import('@/pages/ServiceCatalogPage'));
const TechSelectionPage = lazy(() => import('@/pages/TechSelectionPage'));
const ScheduleServicePage = lazy(() => import('@/pages/ScheduleServicePage'));
const CartPaymentPage = lazy(() => import('@/pages/CartPaymentPage'));
const StatusPage = lazy(() => import('@/pages/StatusPage'));
const RatingPage = lazy(() => import('@/pages/RatingPage'));
const ManageTechniciansPage = lazy(() => import('@/pages/ManageTechniciansPage'));
// const ManageSchedulePage = lazy(() => import('@/pages/ManageSchedulePage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ManageAvailabilityPage = lazy(() => import('@/pages/technician/ManageAvailabilityPage'));
const BookingSuccessPage = lazy(() => import('@/pages/BookingSuccessPage'));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/home' element={<Navigate to='/' />} />
            <Route element={<GuestGuard />}>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </Route>
            <Route path='/book-service'>
              <Route index element={<ServiceCatalogPage />} />
              <Route path='booking/:booking_id/success' element={<BookingSuccessPage />} />
              <Route path='book-technician' element={<TechSelectionPage />} />
              <Route path='booking-tech'>
                <Route path=':id' element={<ScheduleServicePage />} />
                <Route path=':id/payment' element={<CartPaymentPage />} />
              </Route>
            </Route>
            <Route element={<AuthGuard />}>
              <Route path='/profile'>
                <Route index element={<ProfilePage />} />
                <Route path='status' element={<StatusPage />} />
                <Route path='rating' element={<RatingPage />} />
                <Route path='manage-technicians' element={<ManageTechniciansPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='manage-availability' element={<ManageAvailabilityPage />} />
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
