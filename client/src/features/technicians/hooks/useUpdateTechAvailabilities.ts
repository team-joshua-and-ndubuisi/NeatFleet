import { useMutation } from '@tanstack/react-query';
import { updateAvailability } from '@/features/technicians/api';
import { TechnicianAvailabilityI } from '../types/Technician';

export const useUpdateTechAvailability = (userToken: string) => {
  return useMutation({
    mutationFn: (availability: TechnicianAvailabilityI[]) =>
      updateAvailability(userToken, availability),
  });
};
