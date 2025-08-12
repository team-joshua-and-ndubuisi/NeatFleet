import { axiosInstance } from '@/api';
import type { Technician } from '@/features/technicians';

const url = '/availabilities/service';

export const fetchAvailableTechnicians = async (
  serviceId: string | null | undefined,
  date: string | null | undefined,
  time: string | null | undefined
): Promise<Technician[]> => {
  if (!serviceId || !date || !time) {
    throw new Error('Service ID, date, and time are required');
  }

  const response = await axiosInstance.get<{ technicians: Technician[] }>(`${url}/${serviceId}`, {
    params: {
      date,
      time_block: time,
    },
  });

  return response.data.technicians;
};
