import React from 'react';
// import { useParams, Navigate } from 'react-router-dom';
import BookingDetails from './BookingDetails';
import ProgressBar from './ProgressBar';
import UpdateForm from './UpdateForm';

const RealTimeStatus: React.FC = () => {
  return (
    <div className='flex flex-col mx-auto'>
      <ProgressBar />
      <UpdateForm />
      <BookingDetails />
    </div>
  );
};

export default RealTimeStatus;
