import { axiosInstance } from '@/api';
import type { AvailableTime } from '@/features/bookService';

const url = '/availableTimes';

export const fetchAvailableTimes = async (
  serviceId: string | null | undefined,
  date: Date | null | undefined
): Promise<AvailableTime[]> => {
  if (!serviceId || !date) {
    throw new Error('Service ID and date are required');
  }

  const normalizedDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  const formattedDate = normalizedDate.toISOString();

  const response = await axiosInstance.get(`${url}?serviceId=${serviceId}&date=${formattedDate}`);

  return response.data;
};
