import { NavLink } from 'react-router-dom';
const Services = () => {
  return (
    <div className=' mx-auto '>
      <h2 className='text-3xl font-bold text-center'>Our Services</h2>
      <NavLink to={'/book-service'}>
        <div className='mx-10 flex flex-col md:flex-row gap-5 md:mx-50 md:pt-10'>
          <div className=" relative  h-60 rounded-sm text-center  bg-color-black  md:basis-1/2 lg:basis-1/5 bg-cover bg-center bg-[url('/images/sweeping.jpg')] transition-opacity duration-300 hover:opacity-20  ">
            <h3 className='text-center absolute bottom-0 left-0 right-0 text-2xl text-white'>
              Move-Out Cleaning
            </h3>
          </div>
          <div className=" relative  h-60 rounded-sm text-center md:basis-1/2 lg:basis-1/5 bg-cover bg-center bg-[url('/images/moping.jpg')]   transition-opacity duration-300 hover:opacity-20">
            <h3 className=' absolute bottom-0 left-0 right-0 rounded-sm text-center text-center absolute bottom-0 left-0 right-0 text-2xl text-white'>
              Standard Cleaning
            </h3>
          </div>
          <div className=" relative  h-60 rounded-sm text-center md:basis-1/2 lg:basis-1/5 bg-cover bg-center bg-[url('/images/vaccuming.jpg')]   transition-opacity duration-300 hover:opacity-20">
            <h3 className='text-center absolute bottom-0 left-0 right-0 text-2xl text-white'>
              Handyman Services
            </h3>
          </div>
          <div className=" relative  h-60 rounded-sm text-center md:basis-1/2 lg:basis-1/5 bg-cover bg-center bg-[url('/images/deep-clean.jpg')]   transition-opacity duration-300 hover:opacity-20">
            <h3 className='text-center absolute bottom-0 left-0 right-0 text-2xl text-white'>
              Deep Cleaning
            </h3>
          </div>
          <div className=" relative  h-60 rounded-sm text-center md:basis-1/2 lg:basis-1/5 bg-cover bg-center bg-[url('/images/generic-clean.jpg')]   transition-opacity duration-300 hover:opacity-20">
            <h3 className='text-center absolute bottom-0 left-0 right-0 text-2xl text-white'>
              More
            </h3>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Services;
