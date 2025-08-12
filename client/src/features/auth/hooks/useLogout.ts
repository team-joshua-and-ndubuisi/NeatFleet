import { useAuthStore } from '@/features/auth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { setUserToken } = useAuthStore();
  const navigate = useNavigate();

  return () => {
    setUserToken('');
    navigate('/login');
  };
};
