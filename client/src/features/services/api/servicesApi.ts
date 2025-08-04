import { axiosInstance } from '@/api';
import type { Service } from '@/features/services';

const url = '/services';

export const fetchServices = async (): Promise<Service[]> => {
  const response = await axiosInstance.get(url);
  return response.data.services;
};
