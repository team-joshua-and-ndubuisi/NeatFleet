import { useQuery } from '@tanstack/react-query';
import { fetchAddresses } from '@/features/profile/api/addressApi';

export const useFetchAddresses = (userToken: string) => {
  return useQuery({
    queryKey: ['addresses', userToken],
    queryFn: () => fetchAddresses(userToken),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};
