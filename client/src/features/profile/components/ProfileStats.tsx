import React from 'react';
import { StatsT } from '@/features/profile';

interface ProfileStatsProps {
  stats: StatsT;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <div className='flex flex-row items-center justify-around bg-primary-50 border rounded-lg shadow-md p-5'>
      <span className='py-5 text-lg lg:text-2xl font-light text-center'>
        Number of Bookings: <br />
        <span className='font-bold text-4xl'>{stats.bookings_completed}</span>
      </span>
      <span className='py-5 text-lg lg:text-2xl font-light text-center'>
        Years at NeatFleet: <br />
        <span className='font-bold text-4xl'>{stats.years_on_platform}</span>
      </span>
    </div>
  );
};

export default ProfileStats;
