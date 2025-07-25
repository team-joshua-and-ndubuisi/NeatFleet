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

const getAllUserBookings = async (userId: string) => {
  try {
    const bookings = await prismaClient.booking.findMany({
      where: {
        user_id: userId,
      },
    });

    return bookings;
  } catch (error: any) {
    throw new Error(
      `Error fetching bookings for user ${userId}: ${error.message}`
    );
  }
};

const getAllTechnicianBookings = async (technicianId: string) => {
  try {
    const bookings = await prismaClient.booking.findMany({
      where: {
        technician_id: technicianId,
      },
    });

    return bookings;
  } catch (error: any) {
    throw new Error(
      `Error fetching bookings for technician ${technicianId}: ${error.message}`
    );
  }
};

const rateBooking = async (
  bookingId: string,
  ratingScore: number,
  ratingComment?: string
) => {
  try {
    const existing = await prismaClient.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existing) {
      throw new Error(`Booking ${bookingId} does not exist`);
    }

    return await prismaClient.booking.update({
      where: { id: bookingId },
      data: {
        rating_score: ratingScore,
        rating_comment: ratingComment,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to rate booking: ${error.message}`);
  }
};

const updateServiceStatus = async (
  bookingId: string,
  status: ServiceStatus
) => {
  try {
    const booking = await prismaClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        service_status: status,
      },
    });

    return booking;
  } catch (error: any) {
    throw new Error(
      `Error updating service status for booking ${bookingId}: ${error.message}`
    );
  }
};

const updatePaymentStatus = async (
  bookingId: string,
  status: PaymentStatus
) => {
  try {
    const booking = await prismaClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        payment_status: status,
      },
    });

    return booking;
  } catch (error: any) {
    throw new Error(
      `Error updating payment status for booking ${bookingId}: ${error.message}`
    );
  }
};

export {
  createBooking,
  getAllUserBookings,
  getAllTechnicianBookings,
  rateBooking,
  updateServiceStatus,
  updatePaymentStatus,
};
