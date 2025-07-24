import prismaClient from '../config/prisma';
import { ServiceStatus, PaymentStatus } from '../../generated/prisma';

type CreateBookingInput = {
  userId: string;
  serviceId: string;
  technicianId: string;
  serviceDate: string;
  serviceTime?: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  serviceStatus: ServiceStatus;
  serviceNotes?: string;
  paymentStatus: PaymentStatus;
  ratingScore?: number;
  ratingComment?: string;
};

const createBooking = async (data: CreateBookingInput) => {
  try {
    const booking = await prismaClient.booking.create({
      data: {
        user_id: data.userId,
        service_id: data.serviceId,
        technician_id: data.technicianId,
        service_date: data.serviceDate,
        service_time: data.serviceTime,
        address_street: data.addressStreet,
        address_city: data.addressCity,
        address_state: data.addressState,
        address_zip: data.addressZip,
        service_status: data.serviceStatus,
        service_notes: data.serviceNotes,
        payment_status: data.paymentStatus,
        rating_score: data.ratingScore,
        rating_comment: data.ratingComment,
      },
    });
    return booking;
  } catch (error: any) {
    throw new Error(`Error creating booking: ${error.message}`);
  }
};

export { createBooking };
