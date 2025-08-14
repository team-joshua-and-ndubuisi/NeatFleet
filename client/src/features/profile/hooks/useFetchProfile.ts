import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchProfile } from '@/features/profile/api/profileApi';
import { useProfileStore } from '@/features/profile/stores/';

export const useFetchProfile = (userToken: string) => {
  const setProfile = useProfileStore(state => state.setProfile);

  const response = useQuery({
    queryKey: ['profile'], // Include userToken in queryKey for proper caching
    queryFn: () => fetchProfile(userToken),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 1,
    enabled: !!userToken, // Only run query if userToken exists
  });

  // Use useEffect to handle the side effect of setting the store
  useEffect(() => {
    if (response.isSuccess && response.data) {
      setProfile(response.data);
    }
  }, [response.isSuccess, response.data, setProfile]);

  return response;
};
