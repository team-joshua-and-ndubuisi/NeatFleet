import { axiosInstance } from '@/api';
import type { User } from '@/features/users';

const url = '/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const createUser = async (newUser: Omit<User, 'id'>) => {
  const response = await axiosInstance.post(url, newUser);
  return response.data;
};

export const updateUser = async (updatedUser: User) => {
  const response = await axiosInstance.put(`${url}/${updatedUser.id}`, updatedUser);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axiosInstance.delete(`${url}/${id}`);
};
