import { useQuery } from '@tanstack/react-query';
import { fetchCurrentStatus } from '@/features/statusUpdate';

export const useFetchPollStatus = (bookingId?: string) => {
  return useQuery({
    queryKey: ['serviceStatus', bookingId],
    queryFn: () => fetchCurrentStatus(bookingId),
    enabled: !!bookingId,
    refetchInterval: query => (query.state.data == 'completed' ? false : 10000),
    refetchIntervalInBackground: true,
    retry: true,
  });
};
