import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/features/profile/api/profileApi';

export const useFetchProfile = (userToken: string) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(userToken),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 1,
    // initialData: {
    //   user: { userId: '12345ID', userType: 'client', name: 'Bob' },
    //   technician: { techId: '', techName: '', techRating: 4.5 },
    //   bookings: [],
    // },
  });
};
