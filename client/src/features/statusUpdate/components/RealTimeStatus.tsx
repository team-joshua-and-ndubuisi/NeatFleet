import React from 'react';
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
import { useFetchServices } from '@/features/services';




const RealTimeStatus: React.FC = () => {
  const { bookingId } = useParams();
  const userToken = useAuthStore(state => state.token);


  const {
    data: bookingData,
    isLoading,
    error } = useFetchCurrentBooking(bookingId);
  const {
    data: currentStatus,
    isLoading: isCurrentStatusLoading,
    error: pollingError
   } = useFetchPollStatus(bookingId);
  const {
    data: user,
    isLoading: isStatusUpdated,
    error: statusNotFound } = useFetchProfile(userToken);
    const {
    data: services,
    isLoading: areServicesLoading,
    error: servicesNotLoading,
  } = useFetchServices();

   let service = null;

  if (services) {
    service = services?.filter(service => service.id === bookingData?.service_id)[0];
  }

console.log("this is services",services)

  if (!bookingId) {
    return <Navigate to='/profile'/>;
  }
  if (isLoading || isCurrentStatusLoading || isStatusUpdated || areServicesLoading) {
    return <LoadingComponent />;
  }
  if (error|| statusNotFound || pollingError || servicesNotLoading) {
    return <ErrorComponent />;
  }
  if(!user){
    return (<div className="text-center text-xl">
       Must <NavLink className="underline text-blue-600" to="/login"> login</NavLink> to see this page
       </div>)
  }
  const userRole= user.role
  // const userRole ='technician'
  // const userRole ='customer'
  const data = bookingData?.service_status;
  const serviceName=service?.description;
  const serviceDescription= service?.name
  return (
    <div className='flex flex-col mx-auto'>
      {/* View for Customer */}

      {userRole==="customer" && <ProgressBar bookingId={bookingId} status={currentStatus} />}
    {/* View for tech */}
    {     userRole==="technician" &&  <UpdateForm bookingId={bookingId} data={data} />}
      <BookingDetails bookingId={bookingId} bookingData={bookingData} serviceName={serviceName} serviceDescription={serviceDescription}/>
    </div>
  );
};

export default RealTimeStatus;
