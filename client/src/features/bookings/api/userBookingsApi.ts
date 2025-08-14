import { axiosInstance } from '@/api';
import { BookingT } from '@/features/bookings';

const url = 'bookings';

export const fetchUserBookings = async (userid: string | undefined): Promise<BookingT[]> => {
  if (!userid) throw new Error('User ID required');

  const response = await axiosInstance.get(`${url}?userId=${userid}`);

  return response.data;
};
