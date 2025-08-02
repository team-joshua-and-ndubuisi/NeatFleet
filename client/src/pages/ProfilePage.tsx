import React from 'react';
import BookingCard from '@/components/profile/BookingCard';
import BookingSnippet from '@/components/profile/BookingSnippet';
import ProfileMain from '@/components/profile/ProfileMain';
import ProfileContainer from '@/components/profile/ProfileContainer';
import { useFetchProfile } from '@/features/profile';
import { useAuthStore } from '@/features/auth/stores';
import { LoadingIndicator } from '@/components';

const scheduledBookingsMockData = [
  {
    id: '4qwertyu',
    name: 'James Wilson',
    status: 'upcoming',
    date: 1680566400000,
    details: 'Handyman Services',
    rating: 0,
  },
];

const pastBookingsMockData = [
  {
    id: '1sdafasd',
    name: 'Alice Johnson',
    status: 'completed',
    date: 1672531200000,
    details: 'Deep Cleaning',
    rating: 5,
  },
  {
    id: '2qweqwe',
    name: 'Robert Smith',
    status: 'completed',
    date: 1675209600000,
    details: 'Standard Cleaning',
    rating: 4,
  },
  {
    id: '3zxcvbnm',
    name: 'Maria Garcia',
    status: 'cancelled',
    date: 1677888000000,
    details: 'Plumbing Repairs',
    rating: 0,
  },
];

const MOCK_USER_DATA = {
  type: 'tech',
  name: 'JohnDoe123',
  bc: 42,
  years: 5,
  rating: 4.7,
  bookings: pastBookingsMockData,
  location: 'New York, NY',
  image: 'https://example.com/profile-pictures/johndoe.jpg',
};

const ProfilePage: React.FC = () => {
  const userToken = useAuthStore(state => state.token);

  const { data: userProfileData, isLoading, isError } = useFetchProfile(userToken);

  if (isLoading) {
    return <LoadingIndicator message='Loading profile...' />;
  }

  if (isError || !userProfileData) {
    return <div className='text-red-500 text-center'>Error loading profile data.</div>;
  }

  function convertDate(date: number) {
    const newdate = new Date(date);

    return newdate.toLocaleDateString('EN-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  // function getStars(rating:any){
  //   const stars= Array(5).fill(0)

  //   return stars.map((_, index)=>{
  //     return(
  //       <div data-orientation="horizontal">
  //          < Star
  //           key={index}
  //           className=""
  //           color= {(rating)>index? "Orange": "gray"}
  //           />
  //       </div>
  //    )

  //   })
  // }
  return (
    <div>
      <ProfileContainer>
        <h1 className='text-5xl text-center py-5'>Profile </h1>
        <ProfileMain
          userType={userProfileData.user.userType}
          userName={userProfileData.user.first_name + ' ' + userProfileData.user.last_name}
          rating={MOCK_USER_DATA.rating}
          years={MOCK_USER_DATA.years}
          location={MOCK_USER_DATA.location}
          image={MOCK_USER_DATA.image}
          bookingsCompleted={MOCK_USER_DATA.bc}
          bookings={MOCK_USER_DATA.bookings.length}
          phoneNumber={userProfileData.user.phone}
          userId={userProfileData.user.id}
          email={userProfileData.user.email}
        />
        <BookingSnippet title='Scheduled Bookings'>
          {scheduledBookingsMockData.map((booking, index) => {
            return (
              <BookingCard
                id={booking.id}
                key={index}
                name={booking.name}
                status={booking.status}
                date={convertDate(booking.date)}
                details={booking.details}
                rating={booking.rating}
              />
            );
          })}
        </BookingSnippet>
        <BookingSnippet title='Past Bookings'>
          {pastBookingsMockData.map((booking, index) => {
            return (
              <BookingCard
                id={booking.id}
                key={index}
                name={booking.name}
                status={booking.status}
                date={convertDate(booking.date)}
                details={booking.details}
                rating={booking.rating}
              />
            );
          })}
        </BookingSnippet>
      </ProfileContainer>
    </div>
  );
};

export default ProfilePage;
