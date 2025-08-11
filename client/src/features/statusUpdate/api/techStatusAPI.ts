import { axiosInstance } from '@/api';
const serverUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const url = '/bookings';

interface Booking {
  technician: {
    user: {
      first_name: string;
      last_name: string;
    };
  };
  user: {
    first_name: string;
    last_name: string;
  };
  address: string;
  status: string;
  date: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  time_block: string;
  service_date: string;
  payment_status: string;
  service_status: string;
}
//get current service status
export const fetchCurrentStatus = async (bookingId: string | null | undefined): Promise<string> => {
  if (!bookingId) throw new Error('Booking ID is required');
  const response = await axiosInstance.get(`${url}/${bookingId}`);
  return response.data.service_status;
};
export const fetchCurrentBooking = async (
  bookingId: string | null | undefined
): Promise<Booking> => {
  if (!bookingId) throw new Error('Booking ID is required');
  const response = await axiosInstance.get(`${url}/${bookingId}`);
  return response.data;
};

//update current bookung status
export const updateStatus = async (
  bookingId: string | null | undefined,
  nextStatus: string | null | undefined
) => {
  try {
    const response = await fetch(`${serverUrl}${url}/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_status: nextStatus }),
    });

    const result = await response.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Unexpected error at update:', error);
  }
};
