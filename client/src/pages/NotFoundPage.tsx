import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackBtnClick = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background text-center p-6'>
      <h1 className='text-8xl font-bold text-destructive mb-4'>404</h1>
      <h2 className='text-xl text-muted-foreground mb-8'>
        Oops! The page you're looking for doesn't exist.
      </h2>
      <Button onClick={handleBackBtnClick} className='bg-blue-400 hover:bg-blue-500 mt-4'>
        Go Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
