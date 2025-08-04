import { axiosInstance } from '@/api';

const url = '/availabilities/service';

export const fetchAvailableDates = async (
  serviceId: string | null | undefined
): Promise<string[]> => {
  if (!serviceId) throw new Error('Service ID is required');

  const response = await axiosInstance.get<{ available_dates: string[] }>(`${url}/${serviceId}`);

  return response.data.available_dates;
};
