import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = 'Something went wrong while fetching data.',
  onRetry,
}) => {
  return (
    <div className='flex flex-col items-center justify-center p-6 text-center bg-background rounded-lg shadow-sm border'>
      <AlertCircle className='w-12 h-12 text-destructive mb-4' />
      <h3 className='text-lg font-semibold text-muted-foreground mb-4'>{message}</h3>
      {onRetry && (
        <Button variant='default' onClick={onRetry} className='mt-2'>
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
