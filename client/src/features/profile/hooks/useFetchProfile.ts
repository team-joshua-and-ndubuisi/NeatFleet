import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/features/profile/api/profileApi';

export const useFetchProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 1,
    placeholderData: {
      user: { userId: '12345ID', userType: 'client', name: 'Bob' },
      technician: { techId: '', techName: '', techRating: 0 },
      bookings: [],
    },
  });
};
