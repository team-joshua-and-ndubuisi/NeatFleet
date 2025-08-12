import React from 'react';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { cn } from '@/lib/utils';

// ! The state for this component is handled outside of it.

interface RatingInputProps {
  rating: number;
  className?: string;
  size?: number;
  onChange: (rating: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, className, size = 15, onChange }) => {
  return (
    <Rating value={rating} onValueChange={onChange}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton key={index} className={cn('text-secondary-200', className)} size={size} />
      ))}
    </Rating>
  );
};

export default RatingInput;
