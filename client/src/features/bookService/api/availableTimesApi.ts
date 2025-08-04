import { axiosInstance } from '@/api';

const url = '/availabilities/service';

export const fetchAvailableTimes = async (
  serviceId: string | null | undefined,
  date: Date | null | undefined
): Promise<string[]> => {
  if (!serviceId || !date) throw new Error('Service ID and date are required');

  const formattedDate = date.toISOString().split('T')[0];

  const response = await axiosInstance.get<{ time_blocks: Record<string, boolean> }>(
    `${url}/${serviceId}`,
    {
      params: { date: formattedDate },
    }
  );

  const availableTimes = Object.entries(response.data.time_blocks).reduce(
    (acc: string[], [timeSlot, isAvailable]) => {
      if (isAvailable) {
        acc.push(timeSlot);
      }
      return acc;
    },
    []
  );

  return availableTimes;
};
