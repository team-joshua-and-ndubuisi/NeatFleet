import { useQuery } from '@tanstack/react-query';
import { fetchBookingById } from '@/features/bookService';
export const useFetchBookingById = (booking_id: string | undefined) => {
  return useQuery({
    queryKey: ['fetchBooking', booking_id],
    queryFn: () => fetchBookingById(booking_id),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!booking_id,
  });
};
