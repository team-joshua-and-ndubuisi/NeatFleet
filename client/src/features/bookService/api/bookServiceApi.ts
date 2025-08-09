import { axiosInstance } from '@/api';
import { SubmissionData } from '@/features/bookService';

const url = 'bookings';

export const postBooking = async (submissionData: SubmissionData) => {
  if (!submissionData) {
    throw new Error('Form Data Is Required');
  }
  const response = await axiosInstance.post(url, submissionData);

  return response.data;
};
