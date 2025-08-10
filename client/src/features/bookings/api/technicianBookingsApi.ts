import { axiosInstance } from '@/api';
import { BookingT } from '@/features/bookings';

const url = 'bookings';

export const fetchTechnicianBookings = async (
  technicianId: string | undefined
): Promise<BookingT[]> => {
  if (!technicianId) throw new Error('Technician ID required');

  const response = await axiosInstance.get(`${url}?technicianId=${technicianId}`);

  return response.data;
};
