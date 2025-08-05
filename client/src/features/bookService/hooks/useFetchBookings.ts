import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '@/features/bookService';

export const useFetchBookings = (userId: string, token: string) => {
  return useQuery({
    queryKey: ['fetchBookings', userId],
    queryFn: () => fetchBookings(userId, token),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!userId,
  });
};
