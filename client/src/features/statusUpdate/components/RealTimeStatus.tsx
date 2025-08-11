import React from 'react';
// import { useParams, Navigate } from 'react-router-dom';
import BookingDetails from './BookingDetails';
import ProgressBar from './ProgressBar';
import UpdateForm from './UpdateForm';
import { useParams, Navigate, NavLink} from 'react-router-dom';
import { useFetchCurrentBooking } from '../hooks';
import { useFetchPollStatus } from '../hooks';
import LoadingComponent from '@/components/LoadingIndicator';
import ErrorComponent from '@/components/ErrorComponent';
import {useFetchProfile} from '@/features/profile'
import { useAuthStore } from '@/features/auth/stores';


interface BookingProps {
  bookingId: string;
}

const RealTimeStatus: React.FC<BookingProps> = () => {
  const { bookingId } = useParams();
  const userToken = useAuthStore(state => state.token);


  const { data: bookingData, isLoading, error } = useFetchCurrentBooking(bookingId);
  const { data: currentStatus } = useFetchPollStatus(bookingId);
  // const { data: user } = useFetchProfile(userToken);



  // if(!user){
  //   return (<div className="text-center text-xl">
  //      Must <NavLink className="underline text-blue-600" to="/login"> login</NavLink> to see this page
  //      </div>)
  // }
  if (!bookingId) {
    return <Navigate to='/profile' />;
  }
  if (isLoading || !bookingData || !currentStatus) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent />;
  }
  // const userRole= user.role
  const data = bookingData.service_status;
  return (
    <div className='flex flex-col mx-auto'>
      {/* View for Customer */}
      
        <ProgressBar bookingId={bookingId} status={currentStatus} />
    {/* View for tech */}
      <UpdateForm bookingId={bookingId} data={data} />
      <BookingDetails bookingId={bookingId} bookingData={bookingData} />
    </div>
  );
};

export default RealTimeStatus;
