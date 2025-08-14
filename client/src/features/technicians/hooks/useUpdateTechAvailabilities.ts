import { useMutation } from '@tanstack/react-query';
import { updateAvailability } from '@/features/technicians/api';
import { TechnicianAvailabilityFormatI } from '../types/Technician';

export const useUpdateTechAvailability = (userToken: string) => {
  return useMutation({
    mutationFn: async ({
      availability,
      userId,
    }: {
      availability: TechnicianAvailabilityFormatI[];
      userId: string;
    }) => await updateAvailability(userToken, userId, availability),
  });
};
