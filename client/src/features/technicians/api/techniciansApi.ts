import { axiosInstance } from '@/api';
import { Technician } from '@/features/technicians';
import { TechnicianAvailabilityFormatI } from '../types/Technician';

const url = '/technicians';

export const fetchTechnicians = async (): Promise<Technician[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const updateAvailability = async (
  token: string,
  id: string,
  availability: TechnicianAvailabilityFormatI[]
) => {
  const res = await axiosInstance.post(`${url}/${id}/availabilities`, availability, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
