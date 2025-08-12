import { LoginForm } from '@/features/auth';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/stores/';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const { mutateAsync: loginMutate, isError, isPending, isSuccess } = login;
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  let displayComponent: React.ReactNode = <LoginForm apiCall={loginMutate} />;

  if (isError) {
    console.error('Login failed');
  }

  if (isSuccess) {
    console.log('Login successful', { token, user });
    navigate(from, { replace: true });
  }

  if (isPending) {
    displayComponent = <div>Loading...</div>;
  }

  return <div className='w-full flex justify-center h-screen'>{displayComponent}</div>;
}
