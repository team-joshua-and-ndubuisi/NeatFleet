import React from 'react';
import { Link } from 'react-router-dom';

const TechnicianLinks: React.FC = () => {
  return (
    <div className='flex flex-row items-center justify-around'>
      <Link
        to='/profile/manage-services'
        className='text-md py-2 rounded-lg px-4 my-2 bg-primary-300 text-white hover:bg-secondary-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
      >
        <span className='text-2xl'>Manage Services</span>
      </Link>
      <Link
        to='/profile/manage-availability'
        className='text-md py-2 rounded-lg px-4 my-2 bg-primary-300 text-white hover:bg-secondary-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
      >
        <span className='text-2xl'>Manage Availability</span>
      </Link>
    </div>
  );
};

export default TechnicianLinks;
