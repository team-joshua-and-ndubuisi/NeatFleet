import React from 'react';
import { RealTimeStatus } from '@/features/statusUpdate/components';


const StatusPage: React.FC = () => {
  return (
    <div className='mt-16 px-8 '>
      <h4 className='text-3xl text-center mb-4 text-primary'>Status Page</h4>
      <RealTimeStatus />
    </div>
  );
};

export default StatusPage;
