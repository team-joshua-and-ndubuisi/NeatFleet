import React from 'react';
import { useServiceFormStore, usePostBooking } from '@/features/bookService';
import { LoadingIndicator, ErrorComponent } from '@/components/';
import { useProfileStore } from '@/features/profile';

const BookingSuccessPage: React.FC = () => {
  const { profile } = useProfileStore();
  const { formData } = useServiceFormStore();
  const submissionData = {
    user_id: profile?.user.id,
    service_id: formData?.service?.id,
    technician_id: formData?.technician?.id,
    service_date: formData.date,
    time_block: formData?.timeSlot,
    address_street: formData?.address,
    address_city: formData?.city,
    address_state: formData?.state,
    address_zip: formData?.zipcode,
    service_notes: 'Please be careful with the antique vase in the living room.',
  };
  const { data: bookingResponce, isLoading, error } = usePostBooking(submissionData);

  if (isLoading) return <LoadingIndicator message='loading booking info' />;

  if (error) return <ErrorComponent message='booking info not found' />;

  return (
    <div>
      <p>service:{bookingResponce?.service?.name}</p>
      <p>technician:{bookingResponce?.technician?.user.first_name}</p>
      <p>address:{bookingResponce?.address}</p>
    </div>
  );
};

export default BookingSuccessPage;
