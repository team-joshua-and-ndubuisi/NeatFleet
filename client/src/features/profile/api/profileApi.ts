import { axiosInstance } from '@/api';
import { UserProfileT } from '@/features/auth';

const url = '/profile';

export const fetchProfile = async (userId: string): Promise<UserProfileT> => {
  const response = await axiosInstance.get(`${url}:${userId}`);
  return response.data;
};
