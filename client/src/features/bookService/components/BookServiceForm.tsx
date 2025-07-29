// components/ServiceBookingForm.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define valid time slots
type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';

// Form data shape
interface FormData {
  service: string;
  date: Date | null;
  timeSlot: TimeSlot | '';
  technician: string;
}

// Helper types for strict handleChange
type FormFieldKey = keyof FormData;
type FormFieldValue<K extends FormFieldKey> = K extends 'service'
  ? string
  : K extends 'date'
    ? Date | null
    : K extends 'timeSlot'
      ? TimeSlot | ''
      : K extends 'technician'
        ? string
        : never;

// Sample data
const services = ['Plumbing', 'Electrical', 'HVAC'];
const technicians = ['Alice', 'Bob', 'Charlie'];

const ServiceBookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    service: '',
    date: null,
    timeSlot: '',
    technician: '',
  });

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

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6'
    >
      <h2 className='text-2xl font-bold text-gray-800'>Book a Service</h2>

      {/* Service Selection */}
      <div>
        <label className='block text-gray-700 font-semibold mb-2'>Choose a service:</label>
        <div className='space-y-2'>
          {services.map(service => (
            <label key={service} className='flex items-center space-x-2'>
              <input
                type='radio'
                name='service'
                value={service}
                checked={formData.service === service}
                onChange={() => handleChange('service', service)}
                className='accent-blue-600'
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <label className='block text-gray-700 font-semibold mb-2'>Select a date:</label>
        <DatePicker
          selected={formData.date}
          onChange={date => handleChange('date', date)}
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none'
          placeholderText='Pick a date'
          minDate={new Date()}
          dateFormat='MMMM d, yyyy'
        />
      </div>

      {/* Time Slot Selection */}
      <div>
        <label className='block text-gray-700 font-semibold mb-2'>Choose a time slot:</label>
        <div className='space-y-2'>
          {(['Morning', 'Afternoon', 'Evening'] as TimeSlot[]).map(slot => (
            <label key={slot} className='flex items-center space-x-2'>
              <input
                type='radio'
                name='timeSlot'
                value={slot}
                checked={formData.timeSlot === slot}
                onChange={() => handleChange('timeSlot', slot)}
                className='accent-blue-600'
              />
              <span>
                {slot} (
                {
                  {
                    Morning: '8am-12pm',
                    Afternoon: '12pm-4pm',
                    Evening: '4pm-8pm',
                  }[slot]
                }
                )
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Technician Selection */}
      <div>
        <label className='block text-gray-700 font-semibold mb-2'>Choose a technician:</label>
        <div className='space-y-2'>
          {technicians.map(tech => (
            <label key={tech} className='flex items-center space-x-2'>
              <input
                type='radio'
                name='technician'
                value={tech}
                checked={formData.technician === tech}
                onChange={() => handleChange('technician', tech)}
                className='accent-blue-600'
              />
              <span>{tech}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type='submit'
        className='w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
      >
        Submit Booking
      </button>
    </form>
  );
};

export default ServiceBookingForm;
