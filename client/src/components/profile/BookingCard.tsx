import { cn } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface BookingProps {
  name: string;
  status: string;
  date: number | string;
  details: string;
  rating: number;
  id: string;
}

const BookingCard: React.FC<BookingProps> = ({ name, status, date, details, rating, id }) => {
  return (
    <div className=' shadow-md bg-white rounded-lg '>
      <div className='flex'>
        <div className='border  py-3 w-1/5 text-wrap text-center lg:text-xl md:text-xl text-sm  border-round-5x rounded-tl-lg rounded-bl-lg'>
          <span> Name: {name}</span>
        </div>
        <div className='border  py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x'>
          <Link to={`/bookings/${id}`}>
            <span
              className={cn(
                'hover:pointer-coarse text-accent-green underline shadow-2xs',
                {
                  'text-accent-red': status === 'cancelled',
                },
                {
                  'text-primary': status === 'upcoming',
                }
              )}
            >
              {status}
            </span>
          </Link>
        </div>
        <div className='border  py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x'>
          <span>Service Date: {date}</span>
        </div>
        <div className='border  py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x'>
          <span>{details}</span>
        </div>
        <div className='border  py-3 text-wrap w-1/5 lg:text-xl md:text-xl text-sm border-round-5x rounded-br-lg rounded-tr-lg text-center'>
          <span>Rating: {rating || 'not rated yet'}</span>
        </div>
      </div>
    </div>
  );
};
export default BookingCard;
