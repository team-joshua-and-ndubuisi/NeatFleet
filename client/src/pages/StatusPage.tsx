import React from 'react';
import  { UpdateForm }  from '@/features/statusUpdate/components';



const StatusPage: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <UpdateForm/>
      <h4 className='text-3xl mb-4'>Status Page</h4>
    </div>
  );
};

export default StatusPage;
