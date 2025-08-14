import React from 'react';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { cn } from '@/lib/utils';

interface SingleRatingProps {
  rating: number;
  className?: string;
  size?: number;
}

const SingleRating: React.FC<SingleRatingProps> = ({ rating, className, size = 15 }) => {
  return (
    <Rating readOnly value={rating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton
          key={index}
          className={cn('text-secondary-200 pointer-events-none', className)}
          size={size}
        />
      ))}
    </Rating>
  );
};

export default SingleRating;
