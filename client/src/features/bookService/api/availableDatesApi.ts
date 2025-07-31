import { axiosInstance } from '@/api';
import type { Availability } from '@/features/bookService';

const url = '/availableDates';

export const fetchAvailableDates = async (
  serviceId: string | null | undefined
): Promise<Availability[]> => {
  if (!serviceId) throw new Error('Service ID is required');
  const response = await axiosInstance.get(`${url}?serviceId=${serviceId}`);
  return response.data;
};
