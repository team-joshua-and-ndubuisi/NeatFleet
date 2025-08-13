import { Link } from 'react-router-dom';
//change footer contents
export default function Footer() {
  return (
    <footer className='bg-[#3B82F6] text-white border-y'>
      <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
        <div className='flex justify-between
'>
          <div className=' md:mb-0'>
            <div className="flex items-center ">
              <Link to='/' >
                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-soap-dispenser-droplet h-8 w-8" aria-hidden="true"><path d="M10.5 2v4"></path><path d="M14 2H7a2 2 0 0 0-2 2"></path><path d="M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19"></path><path d="M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path></svg>
                <span> NeetFleet </span>
              </Link>

            </div>
          </div>
          <div className=''>
            <h3>Follow Us on Github</h3>
             <div className='flex mt-2 md:mt-4 space-x-5 justify-center sm:mt-0'>



            <Link to='https://github.com/team-joshua-and-ndubuisi/NeatFleet' className='text-[#F9FAFB]'>
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>GitHub account</span>
            </Link>
          </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
        <div className=' flex justify-center  items center'>
          <span className='text-sm text-[#F9FAFB] sm:text-center'>
            ©2025
            <a href='#' className='hover:underline'></a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
