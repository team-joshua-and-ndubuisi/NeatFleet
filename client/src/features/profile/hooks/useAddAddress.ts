import { useMutation } from '@tanstack/react-query';
import { addAddress } from '@/features/profile/api/addressApi';
import { AddressT } from '../types';

export const useAddAddress = (userId: string) => {
  return useMutation({
    mutationFn: (address: AddressT) => addAddress(userId, address),
  });
};
