import { useCheckout } from '@stripe/react-stripe-js';
import { ConfirmError } from '@stripe/stripe-js';
import { useState } from 'react';
import { useAuthStore } from '@/features/auth';

const PayButton = () => {
  const { confirm } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError>();
  const { user } = useAuthStore();

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await confirm({ email: user.email });
      if (result.type === 'error') {
        setError(result.error);
      } else if (result.type === 'success') {
        // make a post request to db with booking data
      }
    } catch (e) {
      setError(e as ConfirmError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={handleClick}
        className='w-full py-3 px-4 bg-secondary-400 text-white rounded-lg hover:bg-secondary transition mt-8'
      >
        Reserve
      </button>
      {error && <div className='text-red-500 mt-8'>{error.message}</div>}
    </div>
  );
};

export default PayButton;
