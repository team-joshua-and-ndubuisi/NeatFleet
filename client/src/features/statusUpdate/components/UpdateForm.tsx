import React, { useState, useEffect } from 'react';
import { ServiceStatusCode, serviceStatusLabels } from '../types/ServiceStatus';
import { Button } from '@/components/ui/button';
import { useUpdateStatus } from '@/features/statusUpdate';
import {BookingProps} from '@/features/statusUpdate'


const UpdateForm: React.FC<BookingProps> = ({ data, bookingId }) => {
  const updateStatusMutation = useUpdateStatus();
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState('');
  //converting enum status to number
  const [currentStatusValue, setCurrentStatusValue] = useState(ServiceStatusCode[data as keyof typeof ServiceStatusCode])
    

    useEffect(() => {
      if (updateStatusMutation.isSuccess && status) {
        // Update local state when mutation succeeds
        const newStatusValue = ServiceStatusCode[status as keyof typeof ServiceStatusCode];
        setCurrentStatusValue(newStatusValue);
        setStatus(''); // Reset form
        setErrors(''); // Clear any errors
      }
    }, [updateStatusMutation.isSuccess, status]);

    useEffect(() => {
      if (updateStatusMutation.isError) {
        setErrors('Failed to update status. Please try again.');
      }
    }, [updateStatusMutation.isError]);

  //converting enum status to service label
  function getStatusName(statusString: string): string {
    const enumKey = statusString as keyof typeof ServiceStatusCode;
    const statusInd = ServiceStatusCode[enumKey];

    return serviceStatusLabels[statusInd];
    }
    console.log('status', status, 'currentStatusValue', currentStatusValue)
  //setting value of next status
  const handleSubmit = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (status != '') {
      updateStatusMutation.mutate({
        bookingId: bookingId,
        newStatus: status,
      });
    } else {
      setErrors('Please select an update status');
    }
  };

  const handleStatusUpdate = (updatedStatus: string | number) => {
    const nextStatusValue = updatedStatus as ServiceStatusCode;

    if (!data) {
      updateStatusMutation.mutate({
        bookingId: bookingId,
        newStatus: 'scheduled',
      });
      return setErrors('Error updating status. Please reload page.');
    }

    setErrors('');
    if (nextStatusValue == currentStatusValue) {
      setErrors(`Already up-to-date`);
      return;
    }
    if (currentStatusValue + 1 < nextStatusValue) {
      setErrors(`Please Select next status before moving forward`);
      return;
    }
    if (currentStatusValue > nextStatusValue) {
      setErrors(`Client has already been already been updated. Please select next status update`);
      return;
    } else if (nextStatusValue == currentStatusValue + 1) {
      //Valid Selection
      setErrors('');
      setStatus(ServiceStatusCode[nextStatusValue]);
    }
  };
  return (
    <div className='mx-auto w-full md:w-3/4 flex flex-col items-center border rounded border-4 border-[#2DD4BF] shadow-md bg-white'>
      <h1 className='my-10 text-2xl font-semibold '>Update Service Status</h1>
      {/* iterate through values of service status to create buttons */}

      <div className='flex flex-col gap-4 w-1/2 justify-center'>
        <p className='text-xl text-center text-[#3B82F6] font-semibold'>
          Current status is {serviceStatusLabels[currentStatusValue]}
        </p>
        {status != '' ? (
          <p> {getStatusName(status)} is selected. Please click update to confirm your selection</p>
        ) : (
          <p>Please select a status</p>
        )}
        {Object.entries(serviceStatusLabels).map(([key, statusOptions], index) => {
          return (
            //adding conditonal if button is == or more that key
            <Button
              onClick={() => handleStatusUpdate(key)}
              className={
                currentStatusValue > index
                  ? 'opacity-50 cursor-not-allowed bg-[#2DD4BF]'
                  : currentStatusValue === index
                    ? ' border border-black bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] outline outline-offset-4 '
                    : ' hover:shadow-xl hover:ring-4 hover:ring-[#2DD4BF] hover:ring-opacity-20'
              }
              value={key}
              key={index}
            >
              {statusOptions}
            </Button>
          );
        })}
      </div>
      <Button
        className={`my-10  hover:opacity-100
                ${
                  status !== null
                    ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-white shadow-2xl ring-4 ring-[#2DD4BF] ring-opacity-40 hover:ring-opacity-60 transform hover:scale-102'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
                `}
        onClick={handleSubmit}
      >
        Update Status
      </Button>
      {errors && <p style={{ color: 'red' }}> {errors}</p>}
      <div></div>
    </div>
  );
};

export default UpdateForm;
