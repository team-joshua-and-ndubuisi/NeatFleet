import React from 'react';
import { useServiceFormStore, usePostBooking } from '@/features/bookService';
import { LoadingIndicator, ErrorComponent } from '@/components/';
import { useAuthStore } from '@/features/auth';

const BookingSuccessPage: React.FC = () => {
  const { user } = useAuthStore();
  const { formData } = useServiceFormStore();

  const submissionData = {
    user_id: user?.id,
    service_id: formData?.service?.id,
    technician_id: formData?.technician?.id,
    service_date: formData?.date ? new Date(formData.date) : null,
    time_block: formData?.timeSlot,
    address_street: formData?.address,
    address_city: formData?.city,
    address_state: formData?.state,
    address_zip: formData?.zipcode,
    service_notes: 'Please be careful with the antique vase in the living room.',
  };
  const { data: bookingResponse, isLoading, error } = usePostBooking(submissionData);

  if (isLoading) return <LoadingIndicator message='loading booking info' />;

  if (error) return <ErrorComponent message={error?.message || 'Error booking service'} />;

  return (
    <div>
      <p>id: {bookingResponse.id}</p>
      <p>user_id: {bookingResponse.user_id}</p>
      <p>service_id: {bookingResponse.service_id}</p>
      <p>technician_id: {bookingResponse.technician_id}</p>
      <p>service_date: {bookingResponse.service_date}</p>
      <p>time_block: {bookingResponse.time_block}</p>
      <p>address_street: {bookingResponse.address_street}</p>
      <p>address_city: {bookingResponse.address_city}</p>
      <p>address_state: {bookingResponse.address_state}</p>
      <p>address_zip: {bookingResponse.address_zip}</p>
      <p>service_status: {bookingResponse.service_status}</p>
      <p>service_notes: {bookingResponse.service_notes}</p>
      <p>payment_status: {bookingResponse.payment_status}</p>
      <p>created_at: {bookingResponse.created_at}</p>
      <p>rating_score: {bookingResponse.rating_score}</p>
      <p>rating_comment: {bookingResponse.rating_comment}</p>
    </div>
  );
};

export default BookingSuccessPage;
