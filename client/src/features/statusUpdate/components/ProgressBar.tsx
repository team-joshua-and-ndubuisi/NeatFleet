//UI for the User to see the progress of the service
import { ServiceStatusCode, serviceStatusLabels } from '../types/ServiceStatus';
import React from 'react';
import {BookingProps} from '@/features/statusUpdate'

const ProgressBar: React.FC<BookingProps> = ({ status }) => {
  const statuses = Object.entries(serviceStatusLabels)
    .filter(([key, label]) => label != 'Cancelled' && key != '100')
    .map(([key, label]) => ({
      id: Number(key),
      label: label,
    }));

  const currentStatusIndex = ServiceStatusCode[status as keyof typeof ServiceStatusCode];

  return (

    <div className='my-10 md:w-3/4 mx-auto rounded text-lg/7 border bg-primary-50'>
      <h2 className='text-2xl font-semibold text-gray-800 my-10 text-center '>
        Realtime Status Updates
      </h2>

      {/* Progress Bar Container */}
      <div className='relative mb-8 rounded mx-10'>
        {/* Background Track */}
        <div className='h-2 bg-gray-200 rounded-full'></div>

        {/* Progress Fill */}
        <div
          className='absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] transition-all duration-700 ease-in-out'
          style={{
            width: `${currentStatusIndex >= 3 ? 100 : (currentStatusIndex / 3) * 100}%`,
          }}
        ></div>

        {/* Status Dots */}
        {statuses.map((status, index) => (
          <div
            key={status.id}
            className='absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2'
            style={{ left: `${(index / (statuses.length - 1)) * 100}%` }}
          >
            <div
              className={`w-6 h-6 rounded-full border-4 transition-all duration-500 ${
                currentStatusIndex >= status.id
                  ? 'bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] border-white shadow-lg scale-110'
                  : 'bg-white border-gray-300'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Status Labels */}
      <div className='flex justify-between items-start'>
        {statuses.map(status => (
          <div key={status.id} className='flex flex-col items-center text-center flex-1'>
            <div
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentStatusIndex >= status.id
                  ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {status.label}
            </div>

            {/* Active Status Indicator */}
            {currentStatusIndex === status.id && (
              <div className='mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold'>
                Current
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status Description */}
      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Status:{' '}
          <span className='font-semibold text-gray-800'>
            {serviceStatusLabels[currentStatusIndex] || 'Not Started'}
          </span>
        </p>
        <div className='my-2 text-sm text-gray-500'>
          Step {currentStatusIndex + 1 || 0} of {statuses.length}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
