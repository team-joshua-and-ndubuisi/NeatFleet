import { axiosInstance } from '@/api';
import { AddressT } from '@/features/profile/types/';

const url = '/profile'; //placeholder

export const addAddress = async (userId: string, address: AddressT): Promise<AddressT> => {
  const response = await axiosInstance.post(`${url}:${userId}/address`, address);
  return response.data;
};
export const updateAddress = async (userId: string, address: AddressT): Promise<AddressT> => {
  const response = await axiosInstance.put(`${url}:${userId}/address`, address);
  return response.data;
};
export const fetchAddresses = async (userId: string): Promise<AddressT[]> => {
  const response = await axiosInstance.get(`${url}:${userId}/addresses`);
  return response.data;
};
