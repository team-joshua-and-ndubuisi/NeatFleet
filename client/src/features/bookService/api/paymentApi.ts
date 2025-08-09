import { axiosInstance } from '@/api';
import { Stripe, PaymentIntentResult } from '@stripe/stripe-js';
import { CreateIntentResponse } from '@/features/bookService';

const url = 'bookings/create-intent';

export const createIntent = async (): Promise<CreateIntentResponse> => {
  try {
    const response = await axiosInstance.post(url);
    return response.data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
};

export const confirmPayment = async (
  stripe: Stripe | null,
  clientSecret: string,
  elements: any
): Promise<PaymentIntentResult> => {
  if (!stripe || !elements) {
    throw new Error('Stripe or elements not initialized');
  }

  try {
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: 'if_required',
    });

    if (result.error) {
      throw new Error(result.error.message || 'Payment confirmation failed');
    }

    return result;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw new Error('Failed to confirm payment');
  }
};
