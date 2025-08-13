import { axiosInstance } from '@/api';

const url = '/availabilities/service';

export const fetchAvailableTimes = async (
  serviceId: string | null | undefined,
  date: string | null | undefined
): Promise<string[]> => {
  if (!serviceId || !date) throw new Error('Service ID and date are required');
  console.log(date);
  const response = await axiosInstance.get<{ time_blocks: Record<string, boolean> }>(
    `${url}/${serviceId}`,
    {
      params: { date },
    }
  );
  console.log(response);

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
