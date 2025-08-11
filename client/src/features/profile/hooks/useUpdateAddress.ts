import { useMutation } from '@tanstack/react-query';
import { updateAddress } from '@/features/profile/api/addressApi';
import { AddressT } from '../types';

export const useUpdateAddress = (userToken: string) => {
  return useMutation({
    mutationFn: (address: AddressT) => updateAddress(userToken, address),
  });
};
