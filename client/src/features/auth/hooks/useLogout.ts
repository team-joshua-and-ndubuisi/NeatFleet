import { useAuthStore } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const client = useQueryClient();
  const { setUserToken } = useAuthStore();
  const navigate = useNavigate();

  return () => {
    client.removeQueries({ queryKey: ['profile'] });
    setUserToken('');
    toast.success('Logged out successfully');
    navigate('/login');
  };
};
