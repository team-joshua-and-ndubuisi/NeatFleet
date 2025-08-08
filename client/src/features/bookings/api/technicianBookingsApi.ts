import { axiosInstance } from '@/api';
import { TechnicianBooking } from '@/features/bookings';

const url = 'bookings';

export const fetchTechnicianBookings = async (
  technicianId: string
): Promise<TechnicianBooking[]> => {
  if (!technicianId) throw new Error('Technician ID required');

  const response = await axiosInstance.get(`${url}/${technicianId}`);

  return response.data;
};
