import { axiosInstance } from '@/api';
import { Technician } from '@/features/technicians';
import { TechnicianAvailabilityI } from '../types/Technician';

const url = '/technicians';

export const fetchTechnicians = async (): Promise<Technician[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const updateAvailability = async (id: string, availability: TechnicianAvailabilityI[]) => {
  const res = await axiosInstance.post(`${url}/${id}/availabilities`, availability);
  return res.data;
};
