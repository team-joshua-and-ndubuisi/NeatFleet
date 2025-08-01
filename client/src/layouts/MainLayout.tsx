import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components';
import { navItems } from '@/data';

const MainLayout: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar heading='Neat Fleet' navItems={navItems} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
