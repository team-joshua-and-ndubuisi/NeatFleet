import React from 'react';
import { ProfileT } from '@/features/profile';
import { SingleRating } from '@/features/ratings';
import { Mail, Phone } from 'lucide-react';

interface ProfileMainProps {
  profile: ProfileT;
}

const ProfileMain: React.FC<ProfileMainProps> = ({ profile }) => {
  // const [showAddressForm, setShowAddressForm] = React.useState(false);

  return (
    <div className='bg-primary-50 '>
      <div className='flex w-full h-1/2 py-10 flex-col  lg:flex-row lg:justify-center md:flex-row md:justify-center border rounded-lg shadow-md p-5'>
        <div className='flex flex-col items-center '>
          <span className='text-3xl text-center py-5'>
            {profile.first_name} {profile.last_name}
          </span>
          {profile.rating_score && (
            <SingleRating rating={Math.round(Number(profile?.rating_score))} size={35} />
          )}
          <div className='md:text-xl lg:text-3xl text-center py-5 flex flex-row items-center gap-5'>
            <Mail size={20} />
            {profile.email}
          </div>
          <div className='md:text-xl lg:text-3xl text-center flex flex-row items-center gap-5'>
            <Phone size={20} />
            {profile.phone}
          </div>
        </div>
      </div>

      {/* {showAddressForm ? (
        <section className='fixed flex flex-col items-center justify-center left-0 top-0 w-full h-screen'>
          <AddressForm
            addressData={address}
            onClose={() => {
              setShowAddressForm(false);
            }}
            apiCall={async addressData => {
              console.log('addressData', addressData);
            }}
          />
        </section>
      ) : null} */}
    </div>
  );
};
export default ProfileMain;
