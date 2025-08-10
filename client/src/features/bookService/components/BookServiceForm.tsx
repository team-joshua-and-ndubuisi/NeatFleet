import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useAuthStore } from '@/features/auth';
import { axiosInstance } from '@/api';
import {
  TimeSlot,
  FormFieldKey,
  FormFieldValue,
  State,
  useServiceFormStore,
  useFetchAvailableDates,
  useFetchAvailableTimes,
  useFetchAvailableTechnicians,
} from '@/features/bookService';
import { useFetchServices } from '@/features/services';
import { LoadingIndicator, ErrorComponent } from '@/components';
import { stateAbbreviations } from '@/data';
import * as Yup from 'yup';
import { PayButton } from '@/features/bookService';
import { formatDate } from '@/lib/utils';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <label className='block text-primary font-semibold text-2xl mb-2'>{title}</label>;
};

const HorizontalLine: React.FC = () => {
  return <hr className='border-t-1 border-primary-100 pb-10 mt-12' />;
};

const formatTimeSlot = (timeSlot: TimeSlot): string => {
  const dict = {
    morning: 'Morning (8am - 12pm)',
    afternoon: 'Afternoon (12pm - 4pm)',
    evening: 'Evening (4pm - 8pm)',
  };

  return dict[timeSlot];
};

const addressValidationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipcode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
    .required('Zipcode is required'),
});

interface ValidationErrors {
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

const ServiceBookingForm: React.FC = () => {
  const { formData, setFormData } = useServiceFormStore();
  const [errors, setErrors] = React.useState<ValidationErrors>({});

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  const { user } = useAuthStore();

  const {
    data: services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useFetchServices();

  const {
    data: availableDates,
    isLoading: areDatesLoading,
    error: datesError,
  } = useFetchAvailableDates(formData.service?.id);

  const {
    data: availableTimes,
    isLoading: areTimesLoading,
    error: timesError,
  } = useFetchAvailableTimes(formData.service?.id, formData.date);

  const {
    data: technicians,
    isLoading: areTechniciansLoading,
    error: techniciansError,
  } = useFetchAvailableTechnicians(formData.service?.id, formData.date, formData.timeSlot);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [formData]);

  useEffect(() => {
    const shouldCreateIntent = !!(
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipcode &&
      formData.service
    );
    if (!shouldCreateIntent) {
      setClientSecret(null);
      return;
    }

    // create intent (amount in cents) — calculate amount server-side in production
    const createIntent = async () => {
      try {
        setIsCreatingIntent(true);
        // Example: choose amount based on selected service (here we use 2000 cents as example)
        const amount = 2000; // adapt to your service model
        const resp = await axiosInstance.post('bookings/create-payment-intent', {
          amount,
          user_id: user?.id,
          service_id: formData?.service?.id,
          technician_id: formData?.technician?.id,
        });
        console.log(resp.data);
        setClientSecret(resp.data.clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent', err);
        setClientSecret(null);
      } finally {
        setIsCreatingIntent(false);
      }
    };

    createIntent();
  }, [
    formData.address,
    formData.city,
    formData.state,
    formData.zipcode,
    formData.service,
    formData.technician,
    user,
  ]);

  function handleChange<K extends FormFieldKey>(key: K, value: FormFieldValue<K>) {
    setFormData({ [key]: value });

    if (key in errors && errors[key as keyof ValidationErrors]) {
      addressValidationSchema
        .validateAt(key as keyof ValidationErrors, { [key]: value })
        .then(() => {
          setErrors(prevErrors => ({ ...prevErrors, [key as keyof ValidationErrors]: undefined }));
        })
        .catch(err => {
          setErrors(prevErrors => ({
            ...prevErrors,
            [key as keyof ValidationErrors]: err.message,
          }));
        });
    }
  }

  function handleBlur<K extends keyof ValidationErrors>(key: K) {
    const value = formData[key];
    if (['address', 'city', 'state', 'zipcode'].includes(key)) {
      addressValidationSchema
        .validateAt(key, { [key]: value })
        .then(() => {
          setErrors(prevErrors => ({ ...prevErrors, [key]: undefined }));
        })
        .catch(err => {
          setErrors(prevErrors => ({ ...prevErrors, [key]: err.message }));
        });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addressValidationSchema.validate(formData, { abortEarly: false });
      console.log('Submitting:', formData);

      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formattedErrors = error.inner.reduce((acc: ValidationErrors, err) => {
          acc[err.path as keyof ValidationErrors] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 bg-primary-50 rounded-2xl shadow-md space-y-6'
    >
      <h2 className='text-4xl font-lato text-foreground text-center'>Book a Service</h2>

      {/* Service Selection */}
      <div>
        <SectionTitle title='Choose a service:' />
        <div className='space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch'>
          {areServicesLoading && <LoadingIndicator message='Loading Services...' />}

          {servicesError && (
            <ErrorComponent message='Something went wrong while fetching services.' />
          )}

          {services?.map(service => (
            <div key={service.id} className='h-full'>
              <input
                type='radio'
                id={`service-${service.id}`}
                name='service'
                value={service.id}
                checked={formData.service?.id === service.id}
                onChange={() => handleChange('service', service)}
                className='hidden'
              />
              <label
                htmlFor={`service-${service.id}`}
                className={`flex items-center justify-center h-full px-4 py-2 rounded-lg border text-center cursor-pointer transition
                          ${
                            formData.service?.id === service.id
                              ? 'bg-primary-400 text-background border-primary-600'
                              : 'bg-card text-foreground border-ring hover:border-primary-300 hover:text-primary-600'
                          }
                            `}
              >
                {service.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      {formData.service && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose a date:' />
          {areDatesLoading && <LoadingIndicator message='Loading Available Dates...' />}

          {datesError && (
            <ErrorComponent message='Something went wrong while fetching available dates.' />
          )}

          {availableDates && availableDates.length > 0 && (
            <DatePicker
              showIcon
              includeDates={availableDates?.map(formatDate)}
              selected={formData.date}
              onChange={date => handleChange('date', date)}
              className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none text-2xl text-primary'
              placeholderText='Pick a date'
              minDate={new Date()}
              dateFormat='MMMM d, yyyy'
            />
          )}
        </div>
      )}

      {/* Time Slot Selection */}
      {formData.date && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose a time slot:' />
          {areTimesLoading && <LoadingIndicator message='Loading times...' />}

          {timesError && <ErrorComponent message='Something went wrong while fetching times.' />}

          {availableTimes && (
            <div className='space-y-2 flex flex-col'>
              {availableTimes.map(availableTime => (
                <div key={availableTime} className='h-full'>
                  <input
                    type='radio'
                    id={availableTime}
                    name='timeslot'
                    value={availableTime}
                    checked={formData?.timeSlot === availableTime}
                    onChange={() => handleChange('timeSlot', availableTime as TimeSlot)}
                    className='hidden'
                  />
                  <label
                    htmlFor={availableTime}
                    className={`flex items-center justify-center h-full px-4 py-2 rounded-lg border text-center cursor-pointer transition
                          ${
                            formData?.timeSlot === availableTime
                              ? 'bg-primary-400 text-background border-primary-600'
                              : 'bg-card text-foreground border-ring hover:border-primary-300 hover:text-primary-600'
                          }
                            `}
                  >
                    {formatTimeSlot(availableTime as TimeSlot)}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Technician Selection */}
      {formData.timeSlot && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose a technician:' />
          <div className='space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch'>
            {areTechniciansLoading && <LoadingIndicator message='Loading technicians...' />}

            {techniciansError && (
              <ErrorComponent message='Something went wrong while fetching technicians.' />
            )}

            {technicians?.map(tech => (
              <div key={tech.id} className='h-full'>
                <input
                  type='radio'
                  id={`tech-${tech.id}`}
                  name='technician'
                  value={tech.id}
                  checked={formData.technician?.id === tech.id}
                  onChange={() => handleChange('technician', tech)}
                  className='hidden'
                />
                <label
                  htmlFor={`tech-${tech.id}`}
                  className={`flex items-center justify-center h-full px-4 py-2 rounded-lg border text-center cursor-pointer transition
                          ${
                            formData.technician?.id === tech.id
                              ? 'bg-primary-400 text-background border-primary-600'
                              : 'bg-card text-foreground border-ring hover:border-primary-300 hover:text-primary-600'
                          }
                            `}
                >
                  {tech.user.first_name} {tech.user.last_name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address section */}
      {formData.technician && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Enter your address:' />
          <div className='space-y-2 flex flex-col'>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                id='address'
                value={formData.address || ''}
                onChange={e => handleChange('address', e.target.value)}
                onBlur={() => handleBlur('address')}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none transition-all duration-300 ease-in-out'
              />
              <p
                className={`text-red-500 overflow-hidden transition-all duration-300 ease-in-out ${errors.address ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {errors.address || null}
              </p>
            </div>
            <div>
              <label htmlFor='apartment'>Apartment</label>
              <input
                type='text'
                name='apartment'
                id='apartment'
                value={formData.apartment || ''}
                onChange={e => handleChange('apartment', e.target.value)}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
            </div>
            <div>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                id='city'
                value={formData.city || ''}
                onChange={e => handleChange('city', e.target.value)}
                onBlur={() => handleBlur('city')}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none transition-all duration-300 ease-in-out'
              />
              <p
                className={`text-red-500 overflow-hidden transition-all duration-300 ease-in-out ${errors.city ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {errors.city || null}
              </p>
            </div>
            <div>
              <label htmlFor='state'>State</label>
              <select
                name='state'
                id='state'
                value={formData.state || ''}
                onChange={e => handleChange('state', e.target.value as State)}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none transition-all duration-300 ease-in-out'
              >
                {['', ...stateAbbreviations].map(state => (
                  // Include an empty string as the first option to allow for a blank initial value
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <p
                className={`text-red-500 overflow-hidden transition-all duration-300 ease-in-out ${errors.state ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {errors.state || null}
              </p>
            </div>
            <div>
              <label htmlFor='zipcode'>Zipcode</label>
              <input
                type='text'
                name='zipcode'
                id='zipcode'
                value={formData.zipcode?.toString() || ''}
                onChange={e => handleChange('zipcode', e.target.value ? e.target.value : null)}
                onBlur={() => handleBlur('zipcode')}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none transition-all duration-300 ease-in-out'
              />
              <p
                className={`text-red-500 overflow-hidden transition-all duration-300 ease-in-out ${errors.zipcode ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {errors.zipcode || null}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Payment section */}
      {isCreatingIntent && <div className='text-sm text-muted'>Preparing payment...</div>}
      {formData.address && formData.city && formData.state && formData.zipcode && clientSecret && (
        <div>
          <HorizontalLine />
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentElement />
            <PayButton />
          </Elements>
        </div>
      )}
    </form>
  );
};

export default ServiceBookingForm;
