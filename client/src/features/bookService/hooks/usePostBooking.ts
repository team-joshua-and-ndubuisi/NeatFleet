import { useQuery } from '@tanstack/react-query';
import { postBooking, SubmissionData } from '@/features/bookService';

export const usePostBooking = (submissionData: SubmissionData) => {
  return useQuery({
    queryKey: ['postBooking', submissionData],
    queryFn: () => postBooking(submissionData),
  });
};
