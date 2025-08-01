import { axiosInstance } from '@/api';
import type { AvailableDate } from '@/features/bookService';

const url = '/availableDates';

export const fetchAvailableDates = async (
  serviceId: string | null | undefined
): Promise<AvailableDate[]> => {
  if (!serviceId) throw new Error('Service ID is required');
  const response = await axiosInstance.get(`${url}?serviceId=${serviceId}`);
  return response.data;
};
