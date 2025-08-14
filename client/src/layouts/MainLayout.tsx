import { NavBar } from '@/components';
import { useNavItems } from '@/hooks';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const navItems = useNavItems();

  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar heading='Neat Fleet' navItems={navItems} />
      <Outlet />
      <Toaster position='top-right' />
    </div>
  );
};

export default MainLayout;
