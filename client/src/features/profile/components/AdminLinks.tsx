import React from 'react';
import { Link } from 'react-router-dom';

const AdminLinks: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <Link
        to='/profile/manage-technicians'
        className='text-md font-semibold py-5 border border-stone-300 rounded px-3 my-2 hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
      >
        <span>Manage Techs</span>
      </Link>
      <Link
        to='/profile/manage-services'
        className='text-md font-semibold py-5 border border-stone-300 rounded px-3 my-2 hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
      >
        <span>Manage Services</span>
      </Link>
    </div>
  );
};

export default AdminLinks;
