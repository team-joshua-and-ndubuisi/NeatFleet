import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const AboutSection = () => {
  return (
    <div className="mx-5 md:mx-20 lg:mx-20 text-sm/8 font-medium my-10">
        <div className="flex flex-col md:flex-row ">
          {/* image to left */}
          <div className=" md:h-150 mx-auto flex-2 mg:py-10 rounded-sm bg-center bg-cover bg-[url('/images/about-section-cleaning.jpg')]">
          </div>
          {/* 2/3 words to the right */}
          <div className="flex-3 animate-appear md:mx-10 flex flex-col md:gap-5 my-auto">
              <h2 className="text-3xl font-bold text-[#3B82F6] ">Mobile Cleaning Made Easy - Book & Relax!</h2>
              <p className="tracking-wide">
                Welcome to NeatFleet - Your Trusted Mobile Cleaning Service! We bring the shine to your space with fast,
                reliable, and eco-friendly cleaning solutions. Whether it is your home, office, or car,
                our professional team arrives fully equipped to leave every corner spotless.
                With flexible scheduling and affordable rates, NeatFleet makes cleaning effortless.
                Book now and experience the convenience of sparkling clean, wherever you are!"
              </p>
              <NavLink to={'/service-catalog'}>
                <Button className='bg-[#2DD4BF] text-lg border-[#F9FAFB] sm:text-xl max-w-[1200px] cursor-pointer'>
                  Book Now
                </Button>
              </NavLink>
          </div>
          </div>
          {/* About section */}
          <div className="flex flex-col md:flex-row py-20">
              <div className="flex-3 my-auto md:mx-10 flex flex-col  md:gap-5 my-auto">
                <h2 className="text-3xl font-bold text-[#3B82F6]">Fresh & Spotless - On the Go!</h2>
                <p className="tracking-wide">
                  In early 2025, founder Alex Rivera was running late for an important client meeting when they spilled coffee all over their car seats. Frantically searching for a last-minute mobile cleaner, Alex realized there was no reliable, on-demand cleaning service that could come fast—without sky-high prices.
                  <br/><br/>Starting with just one van and an app built in Jamie’s garage, they tested the service in their hometown. Word spread fast. Busy parents, overwhelmed remote workers, and even local businesses loved the "tap-and-clean" simplicity. By the end of 2025, NeatFleet had expanded to three cities, with a loyal customer base and a mission: <span className="font-bold">to make clean effortless for everyone.</span>
                  <br/><br/><span className="font-bold text-[#3B82F6]">Today, NeatFleet isn’t just a service—it’s a movement. Because life’s messy enough.
                </span></p>
          </div>
              <div className=" md:h-150 mx-auto flex-2 mg:py-10 rounded-sm bg-center bg-cover bg-[url('/images/scrubbing.jpg')]">

            </div>
          </div>

    </div>
  )
}

export default AboutSection;
