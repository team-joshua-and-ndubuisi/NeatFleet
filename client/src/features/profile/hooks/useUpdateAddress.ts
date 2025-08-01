import { useMutation } from '@tanstack/react-query';
import { updateAddress } from '@/features/profile/api/addressApi';
import { AddressT } from '../types';

export const useUpdateAddress = (userId: string, address: AddressT) => {
  return useMutation({
    mutationFn: () => updateAddress(userId, address),
  });
};
