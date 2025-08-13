import { axiosInstance } from '@/api';
import { BookingT } from '@/features/bookings';
const url = '/bookings';

export const fetchBookings = async (userId: string, token: string): Promise<BookingT[]> => {
  const response = await axiosInstance.get<BookingT[]>(`${url}`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchBookingById = async (booking_id: string | undefined): Promise<BookingT> => {
  console.log(booking_id);
  const response = await axiosInstance.get<BookingT>(`bookings/${booking_id}`);
  console.log(response);
  console.log('checkpoint1');

  return response.data;
};
