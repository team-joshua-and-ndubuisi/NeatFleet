import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/features/client/api/profileApi';

export const useFetchProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};
