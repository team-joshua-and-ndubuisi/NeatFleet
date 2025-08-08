import React from 'react';
import BookingCard from '@/components/profile/BookingCard';
import BookingSnippet from '@/components/profile/BookingSnippet';
import ProfileMain from '@/components/profile/ProfileMain';
import ProfileContainer from '@/components/profile/ProfileContainer';
import { useFetchProfile } from '@/features/profile';
import { useAuthStore } from '@/features/auth/stores';
import { LoadingIndicator } from '@/components';

const ProfilePage: React.FC = () => {
  const userToken = useAuthStore(state => state.token);
  // const userId = useAuthStore(state => state.user.id);

  const { data: userProfileData, isLoading, isError } = useFetchProfile(userToken);
  // const { data: bookingsData } = useFetchBookings(userId, userToken);

  if (isLoading) {
    return <LoadingIndicator message='Loading profile...' />;
  }

  if (isError || !userProfileData) {
    return <div className='text-red-500 text-center'>Error loading profile data.</div>;
  }

  function convertDate(date: string) {
    const newdate = new Date(date);

    return newdate.toLocaleDateString('EN-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  // const { scheduledBookings, pastBookings } = sortBookings(bookingsData || []);
  const scheduledBookings = userProfileData.bookings.upcoming;
  const pastBookings = userProfileData.bookings.past;

  return (
    <div>
      <ProfileContainer>
        <h1 className='text-5xl text-center py-5'>Profile </h1>
        <ProfileMain
          location=''
          userType={userProfileData?.role}
          userName={userProfileData?.first_name + ' ' + userProfileData?.last_name}
          rating={userProfileData?.rating_score}
          years={userProfileData?.stats?.years_on_platform}
          // location={userProfileData?.location}
          // image={userProfileData?.image}
          bookingsCompleted={userProfileData?.stats?.bookings_completed || 0}
          bookings={userProfileData.bookings.upcoming.length}
          phoneNumber={userProfileData?.phone}
          // userId={userProfileData?.user?.id}
          email={userProfileData?.email}
        />
        <BookingSnippet title='Scheduled Bookings'>
          {scheduledBookings.map((booking, index) => {
            return (
              <BookingCard
                id={booking.booking_id}
                key={index}
                name={booking.technician_name}
                status={booking.status}
                date={convertDate(booking.date)}
                details={booking.service_name}
                rating={booking.rating_score}
              />
            );
          })}
        </BookingSnippet>
        <BookingSnippet title='Past Bookings'>
          {pastBookings.map((booking, index) => {
            return (
              <BookingCard
                id={booking.booking_id}
                key={index}
                name={booking.technician_name}
                status={booking.status}
                date={convertDate(booking.date)}
                details={booking.service_name}
                rating={booking.rating_score}
              />
            );
          })}
        </BookingSnippet>
      </ProfileContainer>
    </div>
  );
};

export default ProfilePage;
