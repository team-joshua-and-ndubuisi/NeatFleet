import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '@/features/bookService';

export const useFetchBookings = (userId: string) => {
  return useQuery({
    queryKey: ['fetchBookings', userId],
    queryFn: () => fetchBookings(userId),
    enabled: !!userId,
  });
};
