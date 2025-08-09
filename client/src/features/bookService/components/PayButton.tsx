// import { useCheckout } from '@stripe/react-stripe-js';
// import { ConfirmError } from '@stripe/stripe-js';
import { useState } from 'react';
import { useAuthStore } from '@/features/auth';
import { useServiceFormStore, confirmPayment, postBooking } from '@/features/bookService';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { formatDate } from '@/lib/utils';
// import { axiosInstance } from '@/api';

interface PayButtonProps {
  clientSecret: string;
}

const PayButton: React.FC<PayButtonProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthStore();
  const { formData } = useServiceFormStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    console.log(clientSecret);

    try {
      // 2. Confirm payment with Stripe
      // const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      //   elements,
      //   clientSecret: clientSecret,
      //   redirect: 'if_required',
      // });

      await elements.submit();

      const { error: stripeError, paymentIntent } = await confirmPayment(
        stripe,
        clientSecret,
        elements
      );

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        const submissionData = {
          user_id: user?.id,
          service_id: formData?.service?.id,
          technician_id: formData?.technician?.id,
          service_date: formData?.date && formatDate(formData?.date),
          time_block: formData?.timeSlot,
          address_street: formData?.address,
          address_city: formData?.city,
          address_state: formData?.state,
          address_zip: formData?.zipcode,
          service_notes: 'Please be careful with the antique vase in the living room.',
        };

        const bookingResponse = await postBooking(submissionData);
        console.log(bookingResponse);

        if (!bookingResponse.ok) {
          throw new Error('Failed to save booking.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={loading || !stripe || !elements}
        onClick={handleClick}
        className='w-full py-3 px-4 bg-secondary-400 text-white rounded-lg hover:bg-secondary transition mt-8'
      >
        {loading ? 'Processing... ' : 'Reserve'}
      </button>
      {error && <div className='text-red-500 mt-8'>{error}</div>}
    </div>
  );
};

export default PayButton;
