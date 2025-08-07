//will be placed inside of the tanstack query FN
//this will be getting data to the backend to update the status of the service

import { axiosInstance } from '/Users/yassahreed/collabs/NeatFleet/client/src/api/index';

const url = '/availabilities/service';

export const fetchCurrentStatus = async (
  bookingId: string | null | undefined
): Promise<string[]> => {
  if (!bookingId) throw new Error('Booking ID is required');

  const response = await axiosInstance.get<{ serviceStatus: string[] }>(`${url}/${bookingId}`);

  return response.data.serviceStatus;
};