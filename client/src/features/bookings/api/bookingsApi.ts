import { axiosInstance } from '@/api';
import { BookingT, UpdateBookingPayload } from '@/features/bookings';

const url = 'bookings';

export const fetchBookingById = async (bookingId: string): Promise<BookingT> => {
  if (!bookingId) throw new Error('Booking ID required');

  const response = await axiosInstance.get(`${url}/${bookingId}`);

  return response.data;
};

export const updateBooking = async (
  bookingId: string,
  payload: UpdateBookingPayload
): Promise<Partial<BookingT>> => {
  if (!bookingId) throw new Error('Booking ID required');

  const response = await axiosInstance.patch(`${url}/${bookingId}`, payload);

  return response.data;
};
