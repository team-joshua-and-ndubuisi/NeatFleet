import React from 'react';
import { TechnicianBooking } from '@/features/bookings';

interface BookingProps {
  booking: TechnicianBooking;
}

const Booking: React.FC<BookingProps> = ({ booking }) => {
  return (
    <div>
      <p>id: {booking.id}</p>
      <p>user_id: {booking.user_id}</p>
      <p>technician_id: {booking.technician_id}</p>
    </div>
  );
};

export default Booking;
