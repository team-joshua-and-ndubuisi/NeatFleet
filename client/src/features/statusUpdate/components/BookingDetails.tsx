//Generic Page that has the booking detail
import React from 'react';
import {BookingProps, Booking} from '@/features/statusUpdate'


const BookingDetails: React.FC<BookingProps> = ({ bookingData,  serviceName, serviceDescription }) => {
  const booking = bookingData as Booking;


  const replaceFirstLetter = (str: string) => {
    if (!str) return str;
    const firstChar = str.charAt(0);
    const toggledChar =
      firstChar == firstChar.toUpperCase() ? firstChar.toLowerCase() : firstChar.toUpperCase();
    return toggledChar + str.slice(1);
  };
  const timeBlockTransform = (timeblock: string) => {
    timeblock = timeblock.toLowerCase();
    return timeblock === 'morning'
      ? '8am-12pm CST'
      : timeblock === 'afternoon'
        ? '12pm-4pm CST'
        : timeblock === 'evening'
          ? '4pm-8pm CST'
          : 'Please contact Neatfleet for Service time';
  };
  const technician = `${booking.technician.user.first_name} ${booking.technician.user.last_name}`;
  const user = `${booking.user.first_name} ${booking.user.last_name}`;
  const address = `${booking.address_street}, ${booking.address_city}, ${booking.address_state} ${booking.address_zip}`;
  const timeblock = timeBlockTransform(`${booking.time_block}`);
  const status = replaceFirstLetter(`${booking.payment_status}`);
  const date = `${booking.service_date}`;

  return (
    <div className='my-10 md:w-3/4 mx-auto border border-4 rounded border-[#2DD4BF] text-lg/7 bg-white'>
      <h3 className='text-2xl text-center font-semibold py-5'>Booking Details</h3>
      <div className='grid grid-cols-3 text-center gap-4 px-1'>
        <p className='col-span-full'>
          <span className='text font-semibold '>Service: </span>
          <br />
          {serviceName}
        </p>
        <p className='col-span-full'>
          <span className='font-semibold '>Description: </span>
          <br />
          {serviceDescription}
        </p>
        <p>
          <span className='font-semibold '>Date: </span>
          <br />
          {date}
        </p>
        <p>
          <span className='font-semibold '>Time Window: </span>
          <br />
          {timeblock}
        </p>
        <p>
          <span className='font-semibold '>Customer: </span>
          <br />
          {user}
        </p>
        <p>
          <span className='font-semibold '>Technician: </span>
          <br />
          {technician}
        </p>
        <p>
          <span className='font-semibold '>Address: </span>
          <br />
          {address}
        </p>
        <p className='mb-10'>
          <span className='font-semibold'>Payment Status: </span>
          <br />
          {status}
        </p>
      </div>
    </div>
  );
};

export default BookingDetails;
