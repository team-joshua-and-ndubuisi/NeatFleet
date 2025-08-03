import { axiosInstance } from '@/api';
import { UserProfileT } from '@/features/profile/types/';

const url = '/auth/profile';

export const fetchProfile = async (userToken: string): Promise<UserProfileT> => {
  const response = await axiosInstance.get(`${url}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};
