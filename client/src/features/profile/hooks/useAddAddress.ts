import { useMutation } from '@tanstack/react-query';
import { addAddress } from '@/features/profile/api/addressApi';
import { AddressT } from '../types';

export const useAddAddress = (userId: string, address: AddressT) => {
  return useMutation({
    mutationFn: () => addAddress(userId, address),
  });
};
