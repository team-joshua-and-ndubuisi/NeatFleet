import { useQuery } from '@tanstack/react-query';
import { fetchCurrentStatus } from '@/features/statusUpdate';


export const usefetchPollStatus = (bookingId: string ) => {
    return useQuery({
      queryKey: ['serviceStatus', bookingId],
      queryFn: () => fetchCurrentStatus(bookingId),
      enabled: !!bookingId,
      refetchInterval: (data)=>{
        (data =="completed")? false : 10000
      }
    });
  };