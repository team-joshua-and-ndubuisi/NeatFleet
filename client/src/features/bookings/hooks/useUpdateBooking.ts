import { useMutation } from '@tanstack/react-query';
import { updateBooking } from '@/features/bookings/api/bookingsApi';
import { BookingT, UpdateBookingPayload } from '@/features/bookings/types';

export function useUpdateBooking() {
  return useMutation<
    Partial<BookingT>,
    Error,
    { bookingId: string; payload: UpdateBookingPayload }
  >({
    mutationFn: ({ bookingId, payload }) => updateBooking(bookingId, payload),
  });
}
