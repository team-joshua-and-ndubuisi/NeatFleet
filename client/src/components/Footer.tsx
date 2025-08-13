import { Link } from 'react-router-dom';
import { PocketKnife, Github } from 'lucide-react';
//change footer contents
export default function Footer() {
  return (
    <footer className='bg-[#3B82F6] text-white border-y'>
      <div className='mx-auto w-full p-4 py-6 lg:py-8'>
        <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-8 sm:px-10 md:px-20 lg:px-45'>
          <div className='flex flex-col items-center'>
            <PocketKnife className='h-8 w-8 scale-y-[-1]' />
            <span>Neat Fleet</span>
          </div>
          <div className='text-center text-sm md:text-base lg:text-xl'>
            Home Cleaning and Maintenance Solutions
          </div>

          <div className='flex flex-col items-center text-center'>
            <h3>Follow Us on Github:</h3>

            <div className='flex mt-2 md:mt-4 space-x-5 justify-center'>
              <Link to='https://github.com/team-joshua-and-ndubuisi/NeatFleet'>
                <Github className='h-8 w-8' />
              </Link>
            </div>

            <button className='mt-8 w-full max-w-xs py-3 px-4 bg-secondary-500 text-white rounded-lg hover:bg-primary-500 transition cursor-pointer'>
              <Link to='/about'>Learn About the Team</Link>
            </button>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
        <div className=' flex justify-center  items-center'>
          <span className='text-sm text-[#F9FAFB] sm:text-center'>
            ©2025
            <a href='#' className='hover:underline'></a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
