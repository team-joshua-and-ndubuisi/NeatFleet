// components/ServiceBookingForm.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  TimeSlot,
  FormData,
  Address,
  City,
  State,
  Apartment,
  Zipcode,
  CardName,
  CardNumber,
  CVC,
  Expiry,
  Zip,
  useFetchAvailableDates,
} from '@/features/bookService';
import { useFetchServices, Service } from '@/features/services';
import { Technician, useFetchTechnicians } from '@/features/technicians';
import { LoadingIndicator, ErrorComponent } from '@/components';

// Helper types for strict handleChange
type FormFieldKey = keyof FormData;
type FormFieldValue<K extends FormFieldKey> = K extends 'service'
  ? Service | null
  : K extends 'date'
    ? Date | null
    : K extends 'timeSlot'
      ? TimeSlot | ''
      : K extends 'technician'
        ? Technician | null
        : K extends 'address'
          ? Address | null
          : K extends 'apartment'
            ? Apartment | null
            : K extends 'city'
              ? City | null
              : K extends 'state'
                ? State | null
                : K extends 'zipcode'
                  ? Zipcode | null
                  : K extends 'cardName'
                    ? CardName | null
                    : K extends 'cardNumber'
                      ? CardNumber | null
                      : K extends 'cvc'
                        ? CVC | null
                        : K extends 'expiry'
                          ? Expiry | null
                          : K extends 'zip'
                            ? Zip | null
                            : never;

interface SectionTitleProps {
  title: string;
}

const states = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <label className='block text-primary font-semibold text-2xl mb-2'>{title}</label>;
};

const HorizontalLine: React.FC = () => {
  return <hr className='border-t-1 border-primary-100 pb-10 mt-12' />;
};

const ServiceBookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    service: null,
    date: null,
    timeSlot: '',
    technician: null,
    address: null,
    apartment: null,
    city: null,
    state: null,
    zipcode: null,
    cardName: null,
    cardNumber: null,
    cvc: null,
    expiry: null,
    zip: null,
  });

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
    data: technicians,
    isLoading: areTechniciasLoading,
    error: techniciansError,
  } = useFetchTechnicians();

  // Strictly typed handler
  function handleChange<K extends FormFieldKey>(key: K, value: FormFieldValue<K>) {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    try {
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (areServicesLoading) return <LoadingIndicator />;
  if (servicesError) return <ErrorComponent />;
  if (areTechniciasLoading) return <LoadingIndicator />;
  if (techniciansError) return <ErrorComponent />;

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
      {areDatesLoading && <LoadingIndicator message='Loading Available Dates...' />}
      {datesError && (
        <ErrorComponent message='Something went wrong while fetching available dates.' />
      )}
      {availableDates && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose a date:' />
          <DatePicker
            showIcon
            includeDates={
              availableDates[0].dates ? availableDates[0].dates.map(date => new Date(date)) : []
            }
            selected={formData.date}
            onChange={date => handleChange('date', date)}
            className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none text-2xl text-primary'
            placeholderText='Pick a date'
            minDate={new Date()}
            dateFormat='MMMM d, yyyy'
          />
        </div>
      )}

      {/* Time Slot Selection */}
      {formData.service && formData.date && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose a time slot:' />
          <div className='space-y-2 flex flex-col'>
            {(
              [
                'Morning (8am - 12pm)',
                'Afternoon (12pm - 4pm)',
                'Evening (4pm - 8pm)',
              ] as TimeSlot[]
            ).map(slot => (
              <div key={slot} className='h-full'>
                <input
                  type='radio'
                  id={slot}
                  name='timeslot'
                  value={slot}
                  checked={formData?.timeSlot === slot}
                  onChange={() => handleChange('timeSlot', slot)}
                  className='hidden'
                />
                <label
                  htmlFor={slot}
                  className={`flex items-center justify-center h-full px-4 py-2 rounded-lg border text-center cursor-pointer transition
                          ${
                            formData?.timeSlot === slot
                              ? 'bg-primary-400 text-background border-primary-600'
                              : 'bg-card text-foreground border-ring hover:border-primary-300 hover:text-primary-600'
                          }
                            `}
                >
                  {slot}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technician Selection */}
      {formData.service && formData.date && formData.timeSlot && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose a technician:' />
          <div className='space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch'>
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
                  {tech.first_name} {tech.last_name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address section */}
      {formData.service && formData.date && formData.timeSlot && formData.technician && (
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
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
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
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
            </div>
            <div>
              <label htmlFor='state'>State</label>
              <select
                name='state'
                id='state'
                value={formData.state || ''}
                onChange={e => handleChange('state', e.target.value as State)}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='zipcode'>Zipcode</label>
              <input
                type='text'
                name='zipcode'
                id='zipcode'
                value={formData.zipcode?.toString() || ''}
                onChange={e =>
                  handleChange('zipcode', e.target.value ? Number(e.target.value) : null)
                }
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment section */}

      {formData.address && formData.city && formData.state && formData.zipcode && (
        <div>
          <HorizontalLine />
          <SectionTitle title='Choose your payment:' />
          <div className='space-y-2 flex flex-col'>
            <div>
              <label htmlFor='cardName'>Name on Card</label>
              <input
                type='text'
                id='cardName'
                name='cardName'
                value={formData.cardName || ''}
                onChange={e => handleChange('cardName', e.target.value)}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
            </div>

            <div>
              <label htmlFor='cardNumber'>Card Number</label>
              <input
                type='text'
                id='cardNumber'
                name='cardNumber'
                value={formData.cardNumber || ''}
                onChange={e => handleChange('cardNumber', e.target.value)}
                placeholder='1234 5678 9012 3456'
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='expiry'>Expiration</label>
                <input
                  type='text'
                  id='expiry'
                  name='expiry'
                  value={formData.expiry || ''}
                  onChange={e => handleChange('expiry', e.target.value)}
                  placeholder='MM/YY'
                  className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
                />
              </div>

              <div>
                <label htmlFor='cvc'>CVC</label>
                <input
                  type='text'
                  id='cvc'
                  name='cvc'
                  value={formData.cvc || ''}
                  onChange={e => handleChange('cvc', e.target.value)}
                  placeholder='123'
                  className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
                />
              </div>
            </div>

            <div>
              <label htmlFor='zip'>Billing ZIP Code</label>
              <input
                type='text'
                id='zip'
                name='zip'
                value={formData.zip || ''}
                onChange={e => handleChange('zip', e.target.value)}
                className='w-full px-4 py-2 border rounded-lg shadow-sm bg-background focus:outline-none'
              />
            </div>
          </div>
        </div>
      )}

      {formData.cardName &&
        formData.cardNumber &&
        formData.cvc &&
        formData.expiry &&
        formData.zip && (
          <button
            type='submit'
            className='w-full py-3 px-4 bg-secondary-400 text-white rounded-lg hover:bg-secondary transition mt-8'
          >
            Reserve
          </button>
        )}
    </form>
  );
};

export default ServiceBookingForm;
