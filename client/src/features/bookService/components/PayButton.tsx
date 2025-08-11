import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useServiceFormStore, postBooking } from '@/features/bookService';
import { useAuthStore } from '@/features/auth';

// import { formatDate } from '@/lib/utils';

const PayButton = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { formData, reset } = useServiceFormStore();

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      throw new Error('Stripe payment intent not found');
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // prevent Stripe from forcing a full redirect
    });

    if (error) {
      setError(error.message || 'Payment failed');
      setLoading(false);
    }

    if (paymentIntent?.status === 'succeeded') {
      const submissionData = {
        user_id: user?.id,
        service_id: formData?.service?.id,
        technician_id: formData?.technician?.id,
        service_date: formData?.date, //&& formatDate(formData?.date),
        time_block: formData?.timeSlot,
        address_street: formData?.address,
        address_city: formData?.city,
        address_state: formData?.state,
        address_zip: formData?.zipcode,
        service_notes: 'Please be careful with the antique vase in the living room.',
      };
      //make the booking
      // console.log(submissionData);
      const bookingResponce = await postBooking(submissionData);
      console.log(bookingResponce);
      //clear persisted data and reset zustand state store
      reset();

      // Navigate with bookingData so success page can use it without re-fetching
      //create the route with the booking ID in the url as parameters -> that way when we have booking/:booking_id/success page now we can use that booking_id to fetch that booking (this is how we will get the data for the invoice)
      navigate(`/service-catalog/booking/${bookingResponce.id}/success`);
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={handleClick}
        className='w-full py-3 px-4 bg-secondary-400 text-white rounded-lg hover:bg-secondary transition mt-8'
      >
        {loading ? 'Processing…' : 'Reserve & Pay'}
      </button>
      {error && <div className='text-red-500 mt-4'>{error}</div>}
    </div>
  );
};

export default PayButton;
