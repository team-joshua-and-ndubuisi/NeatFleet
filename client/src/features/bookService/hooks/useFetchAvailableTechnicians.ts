import { useQuery } from '@tanstack/react-query';
import { fetchAvailableTechnicians, TimeSlot } from '@/features/bookService';

export const useFetchAvailableTechnicians = (
  serviceId: string | null | undefined,
  date: Date | null | undefined,
  time: TimeSlot | null | undefined
) => {
  return useQuery({
    queryKey: ['availableTechnicians', serviceId, date?.toISOString(), time],
    queryFn: () => fetchAvailableTechnicians(serviceId, date, time),
    enabled: !!serviceId && !!date && !!time,
  });
};
