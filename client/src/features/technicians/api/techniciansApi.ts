import { axiosInstance } from '@/api';
import { Technician } from '@/features/technicians';

const url = '/technicians';

export const fetchTechnicians = async (): Promise<Technician[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const updateAvailability = async (id: string, availability: any): Promise<void> => {
  await axiosInstance.post(`${url}/technicians/${id}/availabilities`, availability);
};
