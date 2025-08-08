import React from 'react';
import { LoadingIndicator, ErrorComponent } from '@/components';
import { useFetchTechnicianBookings, Booking } from '@/features/bookings';

interface TechnicianBookingsProps {
  technicianId: string;
}

const TechnicianBookings: React.FC<TechnicianBookingsProps> = ({ technicianId }) => {
  const { data: techniciansBookings, isLoading, error } = useFetchTechnicianBookings(technicianId);

  if (isLoading) return <LoadingIndicator message='Loading technician bookings' />;

  if (error) return <ErrorComponent message='Error loading technician bookings' />;

  return (
    <div>
      {techniciansBookings?.map(booking => (
        <Booking key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default TechnicianBookings;
