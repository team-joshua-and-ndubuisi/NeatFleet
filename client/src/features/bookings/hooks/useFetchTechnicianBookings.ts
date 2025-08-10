import { useQuery } from '@tanstack/react-query';
import { fetchTechnicianBookings } from '@/features/bookings';

export const useFetchTechnicianBookings = (technicianId: string | undefined) => {
  return useQuery({
    queryKey: ['technicianBookings', technicianId],
    queryFn: () => fetchTechnicianBookings(technicianId),
    enabled: !!technicianId,
  });
};
