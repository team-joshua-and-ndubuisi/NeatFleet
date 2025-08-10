import React from 'react';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { cn } from '@/lib/utils';

interface AverageRatingProps {
  ratings: number[];
  className?: string;
  size?: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({ ratings, className, size = 15 }) => {
  const avgRating = Math.round(
    ratings.reduce((prev: number, curr: number) => prev + curr, 0) / ratings.length
  );

  return (
    <Rating readOnly value={avgRating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton key={index} className={cn('text-secondary-200', className)} size={size} />
      ))}
    </Rating>
  );
};

export default AverageRating;
