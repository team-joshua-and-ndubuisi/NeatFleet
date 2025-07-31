import { useQuery } from '@tanstack/react-query';
import { fetchAvailableDates } from '@/features/bookService';

export const useFetchAvailableDates = (serviceId: string | null | undefined) => {
  return useQuery({
    queryKey: ['availableDates', serviceId],
    queryFn: () => fetchAvailableDates(serviceId),
    enabled: !!serviceId,
  });
};
