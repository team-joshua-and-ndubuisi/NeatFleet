import { axiosInstance } from '@/api';

const url = '/bookings';

export type BookingT = {
  id: string;
  address_city: string;
  address_street: string;
  address_zip: string;
  rating_score: number;
  rating_comment: string;
  service_id: string;
  user_id: string;
  technician_id: string;
  service_date: string;
  service_notes: string;
  time_block: string;
  service_status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
};

// type BookingResponseT = {
//   bookings: BookingT[];
// };

export const fetchBookings = async (userId: string, token: string): Promise<BookingT[]> => {
  // if (!serviceId || !date || !time) {
  //   throw new Error('Service ID, date, and time are required');
  // }
  const response = await axiosInstance.get<BookingT[]>(`${url}`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
