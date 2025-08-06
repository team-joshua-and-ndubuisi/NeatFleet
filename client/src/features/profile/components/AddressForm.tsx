import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleX } from 'lucide-react';
import { AddressT } from '../types';

// interface AddressRequestI {
//   addressId: string;
//   city: string;
//   state: string;
//   country: string;
//   street: string;
//   zip: string;
// }

interface AddressFormProps {
  addressData?: AddressT;
  apiCall: (addressDetails: AddressT) => Promise<void>;
  onClose?: () => void; // Optional callback to close the form
}

const AddressForm = ({ apiCall, addressData, onClose }: AddressFormProps) => {
  return (
    <form
      className='max-w-md w-full p-6'
      onSubmit={async e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const id = form?.addressId?.value;
        const street = form?.street?.value;
        const city = form?.city?.value;
        const state = form?.state?.value;
        const zip = form?.zip?.value;
        const latitude = form?.latitude?.value || 0;
        const longitude = form?.longitude?.value || 0;

        console.log('Submitting address:', {
          id,
          street,
          city,
          state,
          zip,
          latitude,
          longitude,
        });

        if (apiCall) {
          await apiCall({
            id,
            street,
            city,
            state,
            zip,
            isPrimary: true,
          });
        }
      }}
    >
      <Card className='w-full max-w-sm relative'>
        <CircleX
          className='absolute top-5 right-5 text-2xl font-bold text-red-500 hover:cursor-pointer'
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
        {/* hidden field to store address ID */}
        <Input id='addressId' type='text' defaultValue={addressData?.id || ''} hidden={true} />
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Enter your address details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='street'>Street</Label>
              <Input
                id='street'
                type='text'
                placeholder='123 Main St'
                defaultValue={addressData?.street || ''}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='city'>City</Label>
              <Input
                id='city'
                type='text'
                defaultValue={addressData?.city || ''}
                placeholder='New York'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='state'>State</Label>
              <Input
                id='state'
                type='text'
                defaultValue={addressData?.state || ''}
                placeholder='NY'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='zip'>Zip Code</Label>
              <Input
                id='zip'
                type='text'
                defaultValue={addressData?.zip || ''}
                placeholder='10001'
                required
              />
            </div>
            {/* <div className='grid gap-2'>
              <Label htmlFor='country'>Country</Label>
              <Input
                id='country'
                type='text'
                defaultValue={addressData?.country || ''}
                placeholder='USA'
                required
              />
            </div> */}
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full cursor-pointer'>
            {addressData ? 'Update Address' : 'Add New Address'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddressForm;
