import { useQuery } from '@tanstack/react-query';
import { fetchUserBookings } from '@/features/bookings';

export const useFetchUserBookings = (userId: string) => {
  return useQuery({
    queryKey: ['technicianBookings'],
    queryFn: () => fetchUserBookings(userId),
    enabled: !!userId,
  });
};
