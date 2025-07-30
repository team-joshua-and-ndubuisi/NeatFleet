import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchProfile, updateProfile } from '@/features/profile/api/profileApi';
import { UserProfileT } from '@/features/profile/types/';

export const useFetchProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId),
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};

export const useUpdateProfile = (profileData: UserProfileT) => {
  return useMutation({
    mutationFn: () => updateProfile(profileData.user.userId, profileData),
  });
};
