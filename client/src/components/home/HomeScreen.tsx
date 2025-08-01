import BusinessInfoCard from './BusinessInfoCard';
import homeInfoCards from '@/data/homeInfoCards';
import socialLinks from '@/data/socialLinks';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomeScreen = () => {
  return (
    <div className='flex flex-col min-h-screen min-w-[270px]'>
      {/* Make Appointment Section */}
      <div
        className='flex-[6] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-blue-100'
        style={{ backgroundImage: "url('/images/cozy-living-room-modern-apartment.jpg')" }}
      >
        <NavLink to={'/service-catalog'}>
          <Button className='text-lg sm:text-xl max-w-[1200px] cursor-pointer'>
            Make an Appointment
          </Button>
        </NavLink>
      </div>
      {/* Company Information Section */}
      <div className='flex-[.25] flex flex-col justify-center bg-neutral-100 px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-center'>
          {homeInfoCards.map((card, i) => (
            <BusinessInfoCard key={i} title={card.title} lines={card.lines} />
          ))}
        </div>
      </div>
      {/* Social Media Footer */}
      <div className='flex-[.25] flex items-center justify-center bg-black text-white'>
        <div className='flex gap-6'>
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col items-center hover:text-blue-400 transition-colors'
              aria-label={name}
            >
              <Icon className='w-6 h-6' />
              <span className='text-xs mt-1 hidden sm:block'>{name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
