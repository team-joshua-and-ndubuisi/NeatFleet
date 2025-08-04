import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignupBodyT } from '../authTypes';
import { Link } from 'react-router-dom';
import { Button } from '@/components';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupFormProps {
  apiCall: (userCredentials: SignupBodyT) => Promise<void>;
}
// first_name, last_name, email, password, phone
const SignupForm = ({ apiCall }: SignupFormProps) => {
  return (
    // <div className="w-full flex justify-center items-center">
    <form
      className='max-w-md w-full p-6'
      onSubmit={async e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        apiCall({
          first_name: form.firstName.value,
          last_name: form.lastName.value,
          email: form.email.value,
          password: form.password.value,
          phone: form.phone.value,
        });
      }}
    >
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Signup for an account</CardTitle>
          <CardDescription>Enter your information below to create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input id='firstName' type='text' placeholder='first Name' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input id='lastName' type='text' placeholder='last Name' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input id='phone' type='tel' placeholder='123-456-7890' required />
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
            Signup
          </Button>
          <Button onClick={e => e.preventDefault()} className='w-full cursor-pointer'>
            Signup with google
          </Button>
        </CardFooter>
        <CardAction>
          <Link to='/login'>
            <Button variant='link'>or login Here</Button>
          </Link>
        </CardAction>
      </Card>
    </form>
    // </div>
  );
};

export default SignupForm;
