import { axiosInstance } from '@/api';
import { UserProfileT } from '@/features/profile/types/';

const url = '/profile';

export const fetchProfile = async (userId: string): Promise<UserProfileT> => {
  const response = await axiosInstance.get(`${url}:${userId}`);
  return response.data;
};

export const updateProfile = async (
  userId: string,
  profileData: UserProfileT
): Promise<UserProfileT> => {
  const response = await axiosInstance.put(`${url}/${userId}`, profileData);
  return response.data;
};
