import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  variant = 'secondary',
  size = 'default',
  children = '← Back',
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button onClick={handleClick} variant={variant} size={size} className={cn('mb-4', className)}>
      {children}
    </Button>
  );
};

export default BackButton;
