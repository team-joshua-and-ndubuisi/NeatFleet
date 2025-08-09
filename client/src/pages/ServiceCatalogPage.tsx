import { BookServiceForm } from '@/features/bookService';
// import { CheckoutProvider } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
// import { axiosInstance } from '@/api';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

const ServiceCatalogPage: React.FC = () => {
  // const fetchClientSecret = async (): Promise<string> => {
  //   try {
  //     const response = await axiosInstance.post('/bookings/create-checkout-session');
  //     const secret = response.data.checkoutSessionClientSecret;
  //     return secret;
  //   } catch (err) {
  //     console.error('Failed to create checkout session:', err);
  //     return '';
  //   }
  // };

  // return (
  //   <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
  //     <div className='mt-16 mb-16 px-8'>
  //       <BookServiceForm />
  //     </div>
  //   </CheckoutProvider>
  // );
  return (
    <div className='mt-16 mb-16 px-8'>
      <BookServiceForm />
    </div>
  );
};

export default ServiceCatalogPage;
