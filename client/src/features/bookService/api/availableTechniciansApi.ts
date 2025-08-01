import { axiosInstance } from '@/api';
import type { AvailableTechnician } from '@/features/bookService';

const url = '/availableTechnicians';

export const fetchAvailableTechnicians = async (
  serviceId: string | null | undefined,
  date: Date | null | undefined,
  time: string | null | undefined
): Promise<AvailableTechnician[]> => {
  if (!serviceId || !date || !time) {
    throw new Error('Service ID, date, and time are required');
  }

  const normalizedDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  const formattedDate = normalizedDate.toISOString();

  const response = await axiosInstance.get(
    `${url}?serviceId=${serviceId}&date=${formattedDate}&time=${time}`
  );

  console.log(`${url}?serviceId=${serviceId}&date=${formattedDate}&time=${time}`);

  return response.data;
};
