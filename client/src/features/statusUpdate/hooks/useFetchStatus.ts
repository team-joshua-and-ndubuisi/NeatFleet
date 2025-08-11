//query using tanstack to fetch
//query key will be booking ID
//Enabled: must have a status>previous status
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchCurrentStatus, updateStatus, fetchCurrentBooking } from '@/features/statusUpdate';

interface StatusVariable {
  bookingId: string | undefined;
  newStatus: number | string;
}

export const useFetchCurrentBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ['bookingId', bookingId],
    queryFn: () => fetchCurrentBooking(bookingId),
    enabled: !!bookingId,
  });
};

export const useFetchCurrentStatus = (bookingId: string) => {
  return useQuery({
    queryKey: ['serviceStatus', bookingId],
    queryFn: () => fetchCurrentStatus(bookingId),
    enabled: !!bookingId,
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, StatusVariable>({
    mutationFn: ({ bookingId, newStatus }: StatusVariable) => updateStatus(bookingId, newStatus),

    onMutate: async variables => {
      const { bookingId, newStatus } = variables;

      const previousStatus = queryClient.getQueryData(['bookingStatus', bookingId]);

      //optimistic status update
      queryClient.setQueryData(['bookingStatus', bookingId], newStatus);

      return { previousStatus };
    },
    onSuccess: (result, variables) => {
      queryClient.setQueryData(['bookingStatus', variables.bookingId], result);
    },
    //   onError: (error, variables, context) => {
    //     if (context?.previousStatus !== undefined) {
    //     queryClient.setQueryData(['bookingStatus', variables.bookingId], context.previousStatus);
    //   }
    // }
  });
};
