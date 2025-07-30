import { useQuery } from '@tanstack/react-query';
import { fetchAddresses } from '@/features/profile/api/addressApi';

export const useFetchAddresses = (userId: string) => {
  return useQuery({
    queryKey: ['addresses', userId],
    queryFn: () => fetchAddresses(userId),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};
