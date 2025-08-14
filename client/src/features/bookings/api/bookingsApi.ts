import { axiosInstance } from '@/api';
import { BookingT } from '@/features/bookings';

const url = 'bookings';

export const fetchBookingById = async (bookingId: string): Promise<BookingT[]> => {
  if (!bookingId) throw new Error('Booking ID required');

  const response = await axiosInstance.get(`${url}/${bookingId}`);

  return response.data;
};
