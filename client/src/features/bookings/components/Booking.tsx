import React from 'react';
import { BookingT } from '@/features/bookings';

interface BookingProps {
  booking: BookingT;
}

const Booking: React.FC<BookingProps> = ({ booking }) => {
  return (
    <div>
      // TODO: Feel free to display and style whatever and however you want
      <p>id: {booking.id}</p>
      <p>user_id: {booking.user_id}</p>
      <p>technician_id: {booking.technician_id}</p>
    </div>
  );
};

export default Booking;
