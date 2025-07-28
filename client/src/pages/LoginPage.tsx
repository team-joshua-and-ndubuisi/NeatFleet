import { LoginForm } from '@/features/auth';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/stores/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const { mutateAsync: loginMutate, isError, isPending, isSuccess } = login;

  let displayComponent: React.ReactNode = <LoginForm apiCall={loginMutate} />;

  useEffect(() => {
    if (token && user) {
      navigate('/profile');
    }
  }, [token, user, navigate]);

  if (isSuccess) {
    console.log('Login successful', user, token);
  }

  if (isError) {
    console.error('Login failed');
  }

  if (isPending) {
    displayComponent = <div>Loading...</div>;
  }

  return <div className='w-full flex justify-center h-screen'>{displayComponent}</div>;
}
