import { useQuery } from '@tanstack/react-query';
import { fetchTechnicianBookings } from '@/features/bookings';

export const useFetchTechnicianBookings = (technicianId: string) => {
  return useQuery({
    queryKey: ['technicianBookings'],
    queryFn: () => fetchTechnicianBookings(technicianId),
    enabled: !!technicianId,
  });
};
