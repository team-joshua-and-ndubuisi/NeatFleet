
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AboutSection from './AboutSection';
import Location from './Location';
import Services from './Services';
import Footer from '@/components/Footer';

const HomeScreen = () => {
  return (
    <div className='flex flex-col min-h-screen min-w-[270px] '>
      {/* Make Appointment Section */}
      <div
        className='md:h-200 h-96 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-blue-100 '
        style={{ backgroundImage: "url('/images/cozy-living-room-modern-apartment.jpg')" }}
      >
        <h1 className='text-5xl bg-[#F9FAFB] py-7 px-5 mb-10 text-[#3B82F6] opacity-80'>
          NeatFleet Home and Cleaning Solutions{' '}
        </h1>
        <NavLink to={'/service-catalog'}>
          <Button className='text-lg border-[#F9FAFB] sm:text-xl max-w-[1200px] cursor-pointer'>
            Make an Appointment
          </Button>
        </NavLink>
      </div>
      <div className='bg-cover bg-center bg-no-repeat md:bg-[url(images/background-design.svg)]'>
        <AboutSection />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Location/>
      </div>
      {/* Company Information Section */}
      {/* <div className='flex-[.25] flex flex-col bg-neutral-100 px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-center '>
          {homeInfoCards.map((card, i) => (
           i!=1 && <BusinessInfoCard key={i} title={card.title} lines={card.lines} />
          ))}
        </div>
      </div> */}

      {/* Social Media Footer */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
