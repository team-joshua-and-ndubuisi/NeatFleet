import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingIndicator, ErrorComponent } from '@/components/';
import { useFetchBookingById } from '@/features/bookService';
import { jsPDF } from 'jspdf';
import { useFetchServices } from '@/features/services';
import { capitalizeFirstLetter } from '@/lib/utils';

const BookingSuccessPage: React.FC = () => {
  // const { profile } = useProfileStore();
  // const { formData } = useServiceFormStore();
  const { booking_id } = useParams();
  const { data, isLoading, error } = useFetchBookingById(booking_id);
  // TODO: we need an endpoint for fetching a single service
  const {
    data: services,
    isLoading: areServicesLoading,
    error: servicesNotLoading,
  } = useFetchServices();

  let service = null;

  if (services) {
    service = services?.filter(service => service.id === data?.service_id)[0];
  }
  console.log(data);
  console.log(service?.name);

  if (isLoading) return <LoadingIndicator message='loading booking info' />;

  if (error) return <ErrorComponent message='booking info not found' />;

  if (areServicesLoading) return <LoadingIndicator message='loading service info' />;

  if (servicesNotLoading) return <ErrorComponent message='service info not found' />;

  const generatePDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Service Booking Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${data.id}`, 20, 40);
    doc.text(`Service ID: ${data.service_id}`, 20, 50);
    doc.text(`Service: ${service?.name}`, 20, 60);
    doc.text(`Date: ${data.service_date.slice(0, 10)}`, 20, 70);
    doc.text(`Technician: ${data.technician_id}`, 20, 80);
    doc.text(`Address: ${data.address_street}, ${data.address_city}, ${data.address_zip}`, 20, 90);
    // doc.text(`Payment Intent: ${data.payment_intent_id}`, 20, 90);
    doc.save(`invoice-${data.id}.pdf`);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-primary-50 font-lato'>
      <div className='bg-white shadow-lg rounded-xl p-8 max-w-lg w-full flex flex-col items-center'>
        <h1 className='text-3xl font-bold mb-6 text-center text-primary-600'>Booking Confirmed!</h1>

        <div className='text-left space-y-2 w-full text-xl text-foreground'>
          <p>Booking ID: {booking_id}</p>
          <p>Service: {service?.name}</p>
          <p>Service Status: {data && capitalizeFirstLetter(data?.service_status)}</p>
          <p>Service Date: {data?.service_date.slice(0, 10)}</p>
          <p>Service Notes: {data?.service_notes}</p>
          <p>Time Block: {data && capitalizeFirstLetter(data?.time_block)}</p>
          <p>
            Address: {data?.address_street}, {data?.address_city}, {data?.address_zip}
          </p>
          <p>
            User: {data?.user.first_name} {data?.user.last_name}
          </p>
        </div>

        <button
          onClick={generatePDF}
          className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition cursor-pointer'
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
