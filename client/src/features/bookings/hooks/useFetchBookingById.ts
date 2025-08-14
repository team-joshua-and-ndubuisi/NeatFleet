import { useQuery } from '@tanstack/react-query';
import { fetchBookingById } from '@/features/bookings';

export const useFetchBookingById = (bookingId: string) => {
  return useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => fetchBookingById(bookingId),
    enabled: !!bookingId,
  });
};
