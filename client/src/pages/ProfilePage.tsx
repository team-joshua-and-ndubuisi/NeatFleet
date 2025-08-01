import React from 'react';
// import {useState, useEffect} from 'react';
// import axios from "axios";
import BookingCard from '@/components/profile/BookingCard';
import BookingSnippet from '@/components/profile/BookingSnippet';
import ProfileMain from '@/components/profile/ProfileMain';
import ProfileContainer from '@/components/profile/ProfileContainer';
// import { Star } from 'lucide-react';

//for when the api is set up
// const endpoint='/profile'
// const URL = 'http://localhost5432'+endpoint

const userData = {
  type: '',
  name: 'JohnDoe123',
  bc: 42,
  years: 5,
  rating: 4.7,
  bookings: [
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
    {
      id: '4qwertyu',
      name: 'James Wilson',
      status: 'upcoming',
      date: 1680566400000,
      details: 'Handyman Services',
      rating: 0,
    },
  ],
  location: 'New York, NY',
  image: 'https://example.com/profile-pictures/johndoe.jpg',
};

const ProfilePage: React.FC = () => {
  // const [userData, setUserData]=useState(null)
  const bookings = userData.bookings;

  // useEffect(() =>{
  //Fetch for user model + bookings
  //      axios.get(URL).then((response) => {
  //        setUserData(response.data);
  //      })
  //      let bookings:[] = userData.bookings
  // }, [])

  function convertDate(date: number) {
    const newdate = new Date(date);

    // Extract components
    const day = newdate.getDate();
    const month = newdate.getMonth() + 1;
    const year = newdate.getFullYear();

    return `${day}/${month}/${year}`;
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
          userType={userData.type}
          userName={userData.name}
          bookingsCompleted={userData.bc}
          years={userData.years}
          rating={userData.rating}
          bookings={userData.bookings.length}
          location={userData.location}
          image={userData.image}
        />
        <BookingSnippet>
          {bookings.map((booking, index) => {
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
