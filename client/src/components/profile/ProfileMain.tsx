import React from 'react';
import { Link } from 'react-router-dom';

//Menu at top of profile loaded based on the type of user
interface UserMenuProp {
  userType: string;
  userName: string;
  bookingsCompleted?: number; //Admin Only
  years: number;
  rating?: number; //techs only
  bookings: [] | number; //client only
  location: string;
  image?: string;
  phoneNumber?: string;
  userId: string; //used for fetching profile data
}

const ProfileMain: React.FC<UserMenuProp> = ({
  userType,
  userName,
  years,
  location,
  image,
  bookings,
  rating,
  phoneNumber,
  userId,
}) => {
  return (
    <div className='bg-primary-50 '>
      <div className='flex w-full h-1/2 border-3 border border-black py-10 flex-col  lg:flex-row lg:justify-center  md:flex-row md:justify-center rounded'>
        <div className='flex flex-col items-center '>
          <img
            width='100%'
            className='border border-black size-100 rounded'
            src={image}
            alt='Profile Picture'
          />
          <span className=' text-3xl font-semibold py-5'>{userName}</span>
          <span>ID: {userId} </span>
          <span className='text-3xl text-center py-5'>{location} Memphis, Alabama</span>
          <span className='text-3xl text-center py-5'>Phone Number: #{phoneNumber}</span>
        </div>
        <div className='flex mx-30'>
          <div className=' flex flex-col items-center justify-around '>
            <span className='py-5 text-2xl font-semibold text-center'>
              Number of Bookings: <br />
              {bookings}
            </span>
            <span className='py-5 text-center text-2xl font-semibold'>
              Rating <br />
              {rating}
            </span>
            <span className='py-5 text-2xl font-semibold text-center'>
              Years at NeatFleet: <br />
              {years}
            </span>
            {/* Menu Items for techs  */}
            {userType === 'tech' && (
              <div className='flex flex-col items-center'>
                <Link
                  to='/profile/manage-services'
                  className='text-md font-semibold py-5 border border-stone-300 rounded px-3 my-2 hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
                >
                  <span className='text-2xl'>Manage Services</span>
                </Link>
                <Link
                  to='/profile/manage-availability'
                  className='text-md font-semibold py-5 border border-stone-300 rounded px-3 my-2 hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
                >
                  <span className='text-2xl'>Manage Availability</span>
                </Link>
              </div>
            )}
            {/* Menu Items for Admin */}
            {userType === 'admin' && (
              <div className='flex flex-col items-center'>
                <Link
                  to='/profile/manage-technicians'
                  className='text-md font-semibold py-5 border border-stone-300 rounded px-3 my-2 hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
                >
                  <span>Manage Techs</span>
                </Link>
                <Link
                  to='/profile/manage-services'
                  className='text-md font-semibold py-5 border border-stone-300 rounded px-3 my-2 hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-slate-300 duration-150'
                >
                  <span>Manage Services</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileMain;
