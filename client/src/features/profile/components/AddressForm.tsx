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

interface AddressRequestI {
  addressId: string;
  city: string;
  state: string;
  country: string;
  street: string;
  zip: string;
}

interface AddressFormProps {
  addressData?: AddressRequestI;
  apiCall: (addressDetails: AddressRequestI) => Promise<void>;
}

const AddressForm = ({ apiCall, addressData }: AddressFormProps) => {
  return (
    <form
      className='max-w-md w-full p-6'
      onSubmit={async e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        console.log('form', form.addressId.value);
        const addressId = form.addressId.value;
        const street = form.street.value;
        const city = form.city.value;
        const state = form.state.value;
        const zip = form.zip.value;
        const country = form.country.value;

        console.log('Submitting address:', {
          addressId,
          street,
          city,
          state,
          zip,
          country,
        });

        if (apiCall) {
          await apiCall({
            addressId,
            street,
            city,
            state,
            zip,
            country,
          });
        }
      }}
    >
      <Card className='w-full max-w-sm'>
        {/* hidden field to store address ID */}
        <Input id='addressId' type='text' value={addressData?.addressId || ''} hidden={true} />
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
            <div className='grid gap-2'>
              <Label htmlFor='country'>Country</Label>
              <Input
                id='country'
                type='text'
                defaultValue={addressData?.country || ''}
                placeholder='USA'
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full cursor-pointer'>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddressForm;
