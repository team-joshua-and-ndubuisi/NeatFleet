import { useQuery } from '@tanstack/react-query';
import { createIntent } from '@/features/bookService';
import { CreateIntentResponse } from '@/features/bookService';

export const useCreateIntent = (enabled: boolean) => {
  return useQuery<CreateIntentResponse, Error>(['createIntent'], createIntent, {
    enabled, // Only run the query when enabled is true
    retry: 1, // Retry once on failure
    onError: error => {
      console.error('Error creating payment intent:', error);
    },
  });
};
