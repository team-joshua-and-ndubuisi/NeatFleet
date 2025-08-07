//query using tanstack to fetch
//query key will be booking ID
//Enabled: must have a status>previous status

import { useQuery } from '@tanstack/react-query';
import { fetchCurrentStatus } from '/Users/yassahreed/collabs/NeatFleet/client/src/features/statusUpdate/api/techStatusAPI';

export const usefetchCurrentStatus = (bookingId: string | null | undefined) => {
  return useQuery({
    queryKey: ['bookingStatus', bookingId],
    queryFn: () => fetchCurrentStatus(bookingId),
    enabled: !!bookingId,
  });
};