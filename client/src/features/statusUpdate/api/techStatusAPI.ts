//will be placed inside of the tanstack query FN
//this will be getting data to the backend to update the status of the service

import { axiosInstance } from '@/api';

const url = 'bookings/';
//get current service status
export const fetchCurrentStatus = async (
  bookingId: string | null | undefined
): Promise<string> => {
  if (!bookingId) throw new Error('Booking ID is required');

  const response = await axiosInstance.get<{ serviceStatus: string }>(`${url}/${bookingId}`);

  return response.data.serviceStatus;
};
//update current bookung status
export const updateStatus= async(
  bookingId: string | null | undefined,

  nextStatus: string | null | undefined)=>{
  try{
    const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({updatedStatus: nextStatus, bookingId: bookingId}),
      });

      const result = await response.json();
      console.log('Response:', result);
  }catch(error){
    console.error('Unexpected error at update:', error)
  }
}