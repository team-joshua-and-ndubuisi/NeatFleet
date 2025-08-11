import { axiosInstance } from '@/api';

const url = 'bookings/create-intent';

export const createIntent = async (): Promise<string> => {
  try {
    const response = await axiosInstance.post(url);
    return response.data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
};
