import { useCheckout } from '@stripe/react-stripe-js';
import { ConfirmError } from '@stripe/stripe-js';
import { useState } from 'react';

const PayButton = () => {
  const { confirm } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError>();

  const handleClick = () => {
    setLoading(true);
    // TODO: add current user email
    confirm({ email: 'guest@gmail.com' }).then(result => {
      if (result.type === 'error') {
        setError(result.error);
        console.error(error);
      }
      setLoading(false);
    });
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
