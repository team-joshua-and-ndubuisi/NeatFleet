import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { confirmPayment } from '@/features/bookService';
import { PaymentIntentResult, Stripe } from '@stripe/stripe-js';

interface ConfirmPaymentVariables {
  stripe: Stripe | null;
  clientSecret: string;
  elements: any;
}

export const useConfirmPayment = (): UseMutationResult<
  PaymentIntentResult,
  Error,
  ConfirmPaymentVariables
> => {
  return useMutation<PaymentIntentResult, Error, ConfirmPaymentVariables>(
    ({ stripe, clientSecret, elements }: ConfirmPaymentVariables) =>
      confirmPayment(stripe, clientSecret, elements),
    {
      onSuccess: (result: PaymentIntentResult) => {
        console.log('Payment confirmed successfully:', result);
      },
      onError: (error: Error) => {
        console.error('Error confirming payment:', error);
      },
    }
  );
};
