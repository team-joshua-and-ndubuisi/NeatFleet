import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { ServiceStatusCode, serviceStatusLabels } from '../types/ServiceStatus';
import { Button } from '@/components/ui/button';
import { useFetchCurrentStatus, useUpdateStatus } from '@/features/statusUpdate';
// import LoadingComponent from "@/components/LoadingIndicator"
// import ErrorComponent from "@/components/ErrorComponent"

const UpdateForm: React.FC = () => {
  const { bookingId } = useParams();
  const updateStatusMutation = useUpdateStatus();
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState(null);
  //getting current service status
  const { data } = useFetchCurrentStatus(bookingId);
  //converting enum status to number
  const currentStatusValue = Number(ServiceStatusCode[data]);
  //setting value of next status
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('bookingid', bookingId);
    if (status != null) {
      updateStatusMutation.mutate({
        bookingId: bookingId,
        newStatus: status,
      });
    } else {
      setErrors('Please select an update status');
    }
  };

  const handleStatusUpdate = (updatedStatus: string | number) => {
    if (!data) {
      updateStatusMutation.mutate({
        bookingId: bookingId,
        newStatus: 'scheduled',
      });
      return setErrors('Error updating status. Please reload page.');
    }

    //converint enum to number for comparison
    const nextStatusValue = Number(updatedStatus);
    setErrors('');
    if (nextStatusValue == currentStatusValue) {
      setErrors(`Already up-to-date`);
      // setStatus(null)
      return;
    }
    if (currentStatusValue + 1 < nextStatusValue) {
      setErrors(`Please Select next status before moving forward`);
      // setStatus(null)
      return;
    }
    if (currentStatusValue > nextStatusValue) {
      setErrors(`Client has already been already been updated. Please select next status update`);
      // setStatus(null)
      return;
    } else if (nextStatusValue == currentStatusValue + 1) {
      //Valid Selection
      setErrors('');
      setStatus(ServiceStatusCode[nextStatusValue]);

      console.log(
        'what was pressed',
        nextStatusValue,
        'ServiceStatusCode[2]',
        ServiceStatusCode[2]
      );
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
        {status != null ? (
          <p> {status} is selected. Please click update to confirm your selection</p>
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
        className={`my-10
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
