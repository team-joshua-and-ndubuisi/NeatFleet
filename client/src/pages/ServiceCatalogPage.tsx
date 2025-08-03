import { BookServiceForm } from '@/features/bookService';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

const ServiceCatalogPage: React.FC = () => {
  const fetchClientSecret = async (): Promise<string> => {
    try {
      // TODO: Replace with axiosInstance once the backend is integrated.
      // const response = await axiosInstance.post('/bookings/create-checkout-session');

      const serverUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
      const response = await axios.post(`${serverUrl}/bookings/create-checkout-session`);
      const secret = response.data.checkoutSessionClientSecret;
      return secret;
    } catch (err) {
      console.error('Failed to create checkout session:', err);
      return '';
    }
  };

  return (
    <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <div className='mt-16 mb-16 px-8'>
        <BookServiceForm />
      </div>
    </CheckoutProvider>
  );
};

export default ServiceCatalogPage;
