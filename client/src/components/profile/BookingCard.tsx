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
    <div className='parent-container'>
      <div className='flex py-10'>
        <div className='border border-black py-3 w-1/5 text-wrap text-center lg:text-xl md:text-xl text-sm  border-round-5x rounded-tl-lg rounded-bl-lg'>
          <span> Name: {name}</span>
        </div>
        <div className='border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x'>
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
        <div className='border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x'>
          <span>Service Date: {date}</span>
        </div>
        <div className='border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x'>
          <span>{details}</span>
        </div>
        <div className='flex flex-row border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x rounded-br-lg rounded-tr-lg text-center'>
          <span>Rating: {rating}</span>
        </div>
      </div>
    </div>
  );
};
export default BookingCard;
