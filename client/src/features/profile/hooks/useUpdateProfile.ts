import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/features/profile/api/profileApi';
import { UserProfileT } from '@/features/profile/types/';

export const useUpdateProfile = (profileData: UserProfileT) => {
  return useMutation({
    mutationFn: () => updateProfile(profileData.user.userId, profileData),
  });
};
