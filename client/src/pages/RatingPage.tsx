import React, { useState, useEffect } from 'react';
import { BackButton, ErrorComponent, LoadingIndicator } from '@/components';
import { RatingInput } from '@/features/ratings';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchBookingById, useUpdateBooking } from '@/features/bookings';
import { useFetchServices, Service } from '@/features/services';
import { useQueryClient } from '@tanstack/react-query';

const RatingPage: React.FC = () => {
  const { booking_id } = useParams();
  const navigate = useNavigate();

  const {
    data: booking,
    isLoading: isBookingLoading,
    error: bookingError,
  } = useFetchBookingById(booking_id ?? '');

  const [service, setService] = useState<Service | null>(null);

  const queryClient = useQueryClient();

  const {
    data: services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useFetchServices();

  const { mutate: updateBooking } = useUpdateBooking();

  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>('');

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);
  };

  const handleSave = () => {
    if (!booking) return;

    updateBooking(
      {
        bookingId: booking.id,
        payload: {
          rating_score: rating,
          rating_comment: comments,
        },
      },
      {
        onSuccess: () => {
          console.log('Booking updated successfully');
          queryClient.invalidateQueries({ queryKey: ['profile'] });
          navigate('/profile');
        },
        onError: err => {
          console.error('Error updating booking:', err);
        },
      }
    );
  };

  useEffect(() => {
    if (services && booking) {
      const bookingObj = Array.isArray(booking) ? booking[0] : booking;
      const matchedService = bookingObj
        ? services.find(service => service.id === bookingObj.service_id)
        : null;
      setService(matchedService ?? null);
    }
  }, [services, booking]);

  useEffect(() => {
    if (booking) {
      setRating(booking.rating_score ? Number(booking.rating_score) : 0);
      setComments(booking.rating_comment ?? '');
    }
  }, [booking]);

  if (isBookingLoading) return <LoadingIndicator message='Loading booking...' />;
  if (areServicesLoading) return <LoadingIndicator message='Loading services...' />;

  if (bookingError) return <ErrorComponent message='Error fetching booking' />;

  if (servicesError) return <ErrorComponent message='Error fetching services' />;

  return (
    <div className='mt-16 px-8'>
      <BackButton className='text-white' />
      <div className='flex flex-col items-center bg-primary-50 p-8 rounded-2xl max-w-200 m-auto'>
        <h3 className='text-4xl mb-4'>Rate your service</h3>
        <div className='flex flex-col items-center text-2xl gap-4'>
          <p>
            {booking?.technician.user.first_name} {booking?.technician?.user.last_name}
          </p>
          <p>{booking?.service_date}</p>
          <p>{service?.name}</p>
          <RatingInput rating={rating} onChange={handleRatingChange} size={40} />
          <p>Comments:</p>
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            className='w-full p-2 border rounded bg-white'
            rows={4}
          />
          <button onClick={handleSave} className='mt-4 px-4 py-2 bg-primary-500 text-white rounded'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
