import { axiosInstance } from '@/api';
import { AddressT } from '@/features/profile/types/';

const url = '/users/addresses'; //placeholder

export const addAddress = async (userToken: string, address: AddressT): Promise<AddressT> => {
  const response = await axiosInstance.post(`${url}`, address, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};
export const updateAddress = async (userToken: string, address: AddressT): Promise<AddressT> => {
  const response = await axiosInstance.patch(`${url}/${address.id}`, address, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};
export const fetchAddresses = async (userToken: string): Promise<AddressT[]> => {
  const response = await axiosInstance.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};
