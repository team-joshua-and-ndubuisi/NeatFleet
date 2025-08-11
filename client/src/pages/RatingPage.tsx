import React, { useState, useEffect } from 'react';
import { BackButton, ErrorComponent, LoadingIndicator } from '@/components';
import { AverageRating, RatingInput, SingleRating } from '@/features/ratings';
// import { useFetchTechnicianBookings } from '@/features/bookings';
import { useAuthStore } from '@/features/auth';
import { useFetchProfile } from '@/features/profile';

const RatingPage: React.FC = () => {
  const { token } = useAuthStore();
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useFetchProfile(token);

  console.log(profile);

  const [rating, setRating] = useState(0);

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  useEffect(() => {
    console.log(`Rating is now: ${rating}`);
  }, [rating]);

  if (isProfileLoading) return <LoadingIndicator message='Loading profile...' />;

  if (profileError) return <ErrorComponent message='Error fetching profile' />;

  return (
    <div className='mt-16 px-8'>
      <BackButton />
      <h4 className='text-3xl mb-4'>Rating Page</h4>
      <AverageRating ratings={[3, 4, 5, 1]} />
      <br />
      <SingleRating rating={5} />
      <br />
      <RatingInput rating={rating} onChange={handleRatingChange} />
    </div>
  );
};

export default RatingPage;
