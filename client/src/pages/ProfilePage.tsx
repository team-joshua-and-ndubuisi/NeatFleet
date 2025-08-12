import React from 'react';
import { useAuthStore } from '@/features/auth/stores';
import {
  ProfileContainer,
  useFetchProfile,
  ProfileMain,
  ProfileStats,
  TechnicianLinks,
  AdminLinks,
} from '@/features/profile';
import { BookingAccordion, PastBookingsTable, UpcomingBookingsTable } from '@/features/bookings';
import { ErrorComponent, LoadingIndicator } from '@/components';

const ProfilePage: React.FC = () => {
  const userToken = useAuthStore(state => state.token);

  const {
    data: userProfileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useFetchProfile(userToken);

  if (isProfileLoading) {
    return <LoadingIndicator message='Loading profile...' />;
  }

  if (profileError || !userProfileData) {
    return <ErrorComponent message='Error loading profile' />;
  }

  console.log(userProfileData);

  return (
    <div>
      <ProfileContainer>
        <ProfileMain profile={userProfileData} />
        <ProfileStats stats={userProfileData?.stats} />
        {userProfileData.role !== 'customer' && (
          <div className='bg-primary-50 border rounded-lg shadow-md p-5'>
            {userProfileData.role === 'technician' && <TechnicianLinks />}
            {userProfileData.role === 'admin' && <AdminLinks />}
          </div>
        )}
        <BookingAccordion title='Scheduled Bookings'>
          <UpcomingBookingsTable upcomingBookings={userProfileData.bookings.upcoming} />
        </BookingAccordion>
        <BookingAccordion title='Past Bookings'>
          <PastBookingsTable pastBookings={userProfileData.bookings.past} />
        </BookingAccordion>
      </ProfileContainer>
    </div>
  );
};

export default ProfilePage;
