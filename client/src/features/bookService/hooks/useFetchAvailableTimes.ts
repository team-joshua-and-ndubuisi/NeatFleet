import { useQuery } from '@tanstack/react-query';
import { fetchAvailableTimes } from '@/features/bookService';

export const useFetchAvailableTimes = (
  serviceId: string | null | undefined,
  date: string | null | undefined
) => {
  return useQuery({
    queryKey: ['availableTimes', serviceId, date],
    queryFn: () => fetchAvailableTimes(serviceId, date),
    enabled: !!serviceId && !!date,
  });
};
