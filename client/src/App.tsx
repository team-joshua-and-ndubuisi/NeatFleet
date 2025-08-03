import AppRoutes from '@/routes';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { axiosInstance } from './api';
import axios from 'axios';

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

function App() {
  const fetchClientSecret = async (): Promise<string> => {
    // TODO: Replace with axiosInstance once the backend is integrated.
    // const response = await axiosInstance.post('/bookings/create-checkout-session');

    const response = await axios.post('http://localhost:3000/api/bookings/create-checkout-session');
    const secret = response.data.checkoutSessionClientSecret;
    return secret;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <AppRoutes />
      </CheckoutProvider>
    </QueryClientProvider>
  );
}

export default App;
