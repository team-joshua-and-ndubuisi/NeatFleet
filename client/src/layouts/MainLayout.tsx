import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components';
import { useNavItems } from '@/hooks';

const MainLayout: React.FC = () => {
  const navItems = useNavItems();

  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar heading='Neat Fleet' navItems={navItems} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
