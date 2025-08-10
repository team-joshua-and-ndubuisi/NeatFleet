import { axiosInstance } from '@/api';
import { ProfileT } from '@/features/profile';

const url = '/auth/profile';

export const fetchProfile = async (userToken: string): Promise<ProfileT> => {
  const response = await axiosInstance.get(`${url}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};
