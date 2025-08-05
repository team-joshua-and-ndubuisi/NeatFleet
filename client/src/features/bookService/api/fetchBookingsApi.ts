import { axiosInstance } from '@/api';

const url = '/bookings';

type BookingT = {
  id: string;
  user_id: string;
  technician_id: string;
  service_date: string;
  time_block: string;
  service_status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
};

type BookingResponseT = {
  bookings: BookingT[];
};

export const fetchBookings = async (userId: string, token: string): Promise<BookingResponseT> => {
  // if (!serviceId || !date || !time) {
  //   throw new Error('Service ID, date, and time are required');
  // }
  const response = await axiosInstance.get<BookingResponseT>(`${url}`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
