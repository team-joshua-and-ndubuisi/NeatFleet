import { useAuthStore } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const { setUserToken } = useAuthStore();
  const navigate = useNavigate();

  return () => {
    setUserToken('');
    toast.success('Logged out successfully');
    navigate('/login');
  };
};
