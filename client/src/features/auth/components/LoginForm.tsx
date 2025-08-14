import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { AuthResponseT, LoginBodyT } from '../authTypes';
import { useAuthStore } from '../stores';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '@/lib/utils';

interface LoginFormProps {
  apiCall: (userCredentials: LoginBodyT) => Promise<AuthResponseT>;
}

const LoginForm = ({ apiCall }: LoginFormProps) => {
  const { initAuth } = useAuthStore();
  return (
    <form
      className='max-w-md w-full p-6'
      onSubmit={async e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        try {
          const data = await apiCall({ email, password });
          initAuth(data);
          toast.success('Login successful');
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          toast.error(errorMessage);
        }
      }}
    >
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <a
                  href='#'
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                >
                  Forgot your password?
                </a>
              </div>
              <Input id='password' type='password' required />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full cursor-pointer'>
            Login
          </Button>
          <Button onClick={e => e.preventDefault()} className='w-full cursor-pointer'>
            Google Login
          </Button>
          <CardAction>
            <Link to='/signup'>
              <Button variant='link'>Sign Up Here</Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
