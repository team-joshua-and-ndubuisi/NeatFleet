import { useQuery } from '@tanstack/react-query';
import { fetchAvailableTimes } from '@/features/bookService';

export const useFetchAvailableTimes = (
  serviceId: string | null | undefined,
  date: Date | null | undefined
) => {
  return useQuery({
    queryKey: ['availableTimes', serviceId, date?.toISOString()],
    queryFn: () => fetchAvailableTimes(serviceId, date),
    enabled: !!serviceId && !!date,
  });
};
