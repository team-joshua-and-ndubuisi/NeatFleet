import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
 const Location = () => {
  return(
    <div className='px-5 text-sm/8 font-medium mt-20 bg-center bg-cover bg-[url(/images/background-design.svg)]'>
      <h2 className=" text-3xl font-bold text-center mb-5"> Location</h2>
      <p className="tracking-wide text-sm/8  text-center ">NeatFleet Home and Cleaning Solutions in Dallas offers top-notch cleaning services, delivering exceptional care to your home or office across the surrounding areas.
      <br/><span className="text-[#3B82F6]">Trust our professional team to keep your space spotless with reliable, tailored cleaning and repair solutions!</span> </p>
      <div className="flex flex-col text-center text-lg justify-center sm:text-xl mb-3">
        <img className="md:w-1/2 mx-auto rounded" src="./images/neatfleet-building.jpg" alt="NeatFleet Building"/>
        <span className="font-semibold py-3">Address</span>
        <p className="text-muted-foreground">73192 Fleet Avenue<br/>Suite 117<br/>Dallas, TX 76201</p>
        <div className="flex flex-col md:flex-row justify-center  items-center mt-10">
           <div className="md:pr-10 md:py-9 mb-10 md:mb-1" >
              <span className="font-semibold">Service Hours</span>
              <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 8:00 PM<br/> Sat: 8:00 AM - 4:00 PM<br/> Sun: Closed</p>
            </div>
            <div className="md:pl-10 md:py-10  md:border-l-4 md:border-[#2DD4BF]/50">
              <span className="font-semibold">Contact Information</span>
              <p className="text-muted-foreground">Email: contact@neatfleet.com<br/> Phone: (972) 456-7890</p>
            </div>
        </div>
        <NavLink to={'/book-service'}>
          <Button className='bg-[#2DD4BF] my-10 p-5 mx-auto text-lg border-[#F9FAFB] sm:text-xl max-w-[1200px] cursor-pointer md:w-1/8'>
                Book Now!
          </Button>
        </NavLink>
      </div>


  </div>)
};

export default Location;
