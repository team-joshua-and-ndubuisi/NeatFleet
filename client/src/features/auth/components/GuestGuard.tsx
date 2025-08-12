import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/stores/authStore';

export const GuestGuard: React.FC = () => {
  const { token } = useAuthStore();
  return !token ? <Outlet /> : <Navigate to='/' />;
};
