import { AddressT, useAddAddress, useFetchAddresses, useUpdateAddress } from '@/features/profile';
import AddressForm from '@/features/profile/components/AddressForm';
import { Edit3 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator';
import { useAuthStore } from '@/features/auth/stores';

//Menu at top of profile loaded based on the type of user
interface UserMenuProp {
  userType: string;
  userName: string;
  bookingsCompleted?: number; //Admin Only
  address?: {
    addressId: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  years: number;
  rating?: number; //techs only
  bookings: [] | number; //client only
  location: string;
  image?: string;
  phoneNumber?: string;
  // userId: string; //used for fetching profile data
  email: string; //used for fetching profile data
}

const ProfileMain: React.FC<UserMenuProp> = ({
  userType = '',
  userName = '',
  years = 0,
  location = '',
  image = '#',
  bookings = [],
  rating = '',
  phoneNumber = '',
  // userId = '',
  email = '',
}) => {
  const [showAddressForm, setShowAddressForm] = React.useState(false);
  const userToken = useAuthStore(state => state.token);

  const { data: addressesData, isLoading: isLoadingAddresses } = useFetchAddresses(userToken);

  const { mutateAsync: updateAddress } = useUpdateAddress(userToken);
  const { mutateAsync: addAddress } = useAddAddress(userToken);

  let primaryAddress: AddressT | undefined;

  let addressFormApiCall = updateAddress; //changes based on whether address exists or not

  //no addresses found change api call to addAddress
  if (!addressesData || addressesData.length === 0) {
    primaryAddress = undefined;
    addressFormApiCall = addAddress;
  }

  primaryAddress = addressesData?.find(address => address.isPrimary);

  return (
    <div className='bg-primary-50 '>
      <div className='flex w-full h-1/2 border-3 border-black py-10 flex-col  lg:flex-row lg:justify-center  md:flex-row md:justify-center rounded'>
        <div className='flex flex-col items-center '>
          <img
            width='100%'
            className='border border-black size-100 rounded'
            src={image}
            alt='Profile Picture'
          />
          <span className=' text-3xl font-semibold py-5'>{userName}</span>
          {/* <span>ID: {userId} </span> */}
          <span className='text-3xl text-center py-5 flex'>{location}</span>
          <section className='bg-slate-100 p-5 rounded-lg shadow-lg relative'>
            <h3>Primary Address:</h3>
            {isLoadingAddresses ? (
              <LoadingIndicator message='Loading address...' />
            ) : (
              <div>
                {primaryAddress ? (
                  <span className='text-2xl'>
                    {primaryAddress?.street}, {primaryAddress?.city}, {primaryAddress?.state}{' '}
                    {primaryAddress?.zip},
                  </span>
                ) : (
                  <span> no primary address set</span>
                )}
              </div>
            )}
            <Edit3
              color='#22b453'
              onClick={() => {
                setShowAddressForm(true);
              }}
              className='hover:cursor-pointer rounded-2xl shadow-2xl absolute top-2 right-2'
            />
          </section>
          <span className='text-3xl text-center py-5'>Phone Number: #{phoneNumber}</span>
          <span className='text-3xl text-center py-5'>Email: {email}</span>
        </div>
        <div className='flex mx-30'>
          <div className=' flex flex-col items-center justify-around '>
            <span className='py-5 text-2xl font-semibold text-center'>
              Number of Bookings: <br />
              {bookings}
            </span>
            {rating ? (
              <span className='py-5 text-center text-2xl font-semibold'>
                Rating <br />
                {rating}
              </span>
            ) : null}
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

      {showAddressForm ? (
        <section className='fixed flex flex-col items-center justify-center left-0 top-0 w-full h-screen'>
          <AddressForm
            addressData={primaryAddress}
            onClose={() => {
              setShowAddressForm(false);
            }}
            apiCall={async addressData => {
              await addressFormApiCall(addressData);
            }}
          />
        </section>
      ) : null}
    </div>
  );
};
export default ProfileMain;
