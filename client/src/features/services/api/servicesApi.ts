import { axiosInstance } from '@/api';
import type { ServicesData } from '@/features/services';

const url = '/services';

export const fetchServices = async (): Promise<ServicesData> => {
  const response = await axiosInstance.get(url);
  return response.data;
};
