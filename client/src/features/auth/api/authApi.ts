import { axiosInstance } from '@/api';
import type { LoginBodyT, SignupBodyT, AuthResponseT } from '@/features/auth/authTypes';

export const login = async (userCredentials: LoginBodyT): Promise<AuthResponseT> => {
  const response = await axiosInstance.post(`/auth/login`, userCredentials);
  return response.data;
};

export const signup = async (newUser: SignupBodyT): Promise<AuthResponseT> => {
  const response = await axiosInstance.post(`/auth/register`, newUser);
  return response.data;
};
