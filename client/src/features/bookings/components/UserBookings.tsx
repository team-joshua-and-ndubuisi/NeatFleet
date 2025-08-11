import React from 'react';
import { LoadingIndicator, ErrorComponent } from '@/components';
import { useFetchUserBookings, Booking } from '@/features/bookings';

interface UserBookingsProps {
  userId: string;
}

const UserBookings: React.FC<UserBookingsProps> = ({ userId }) => {
  const { data: userBookings, isLoading, error } = useFetchUserBookings(userId);

  if (isLoading) return <LoadingIndicator message='Loading user bookings' />;

  if (error) return <ErrorComponent message='Error loading user bookings' />;

  return (
    <div>
      {userBookings?.map(booking => (
        <Booking key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default UserBookings;
