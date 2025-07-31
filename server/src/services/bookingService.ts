import { Booking, PaymentStatus, ServiceStatus } from '../../generated/prisma';
import prismaClient from '../config/prisma';

type CreateBookingInput = {
  user_id: string;
  service_id: string;
  technician_id: string;
  service_date: string;
  service_time?: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  service_status: ServiceStatus;
  service_notes?: string;
  payment_status: PaymentStatus;
  rating_score?: number;
  rating_comment?: string;
};

type UpdateBookingInput = Partial<CreateBookingInput>;

const createBooking = async (
  newBooking: CreateBookingInput
): Promise<Booking> => {
  const { user_id, technician_id } = newBooking;

  const user = await prismaClient.user.findUnique({ where: { id: user_id } });
  if (!user) {
    throw new Error(`User not found.`);
  }

  const technician = await prismaClient.technician.findUnique({
    where: { id: technician_id },
  });
  if (!technician) {
    throw new Error(`Technician not found.`);
  }

  const booking = await prismaClient.booking.create({ data: newBooking });
  return booking;
};

const getUserBookings = async (
  userId: string,
  serviceStatus?: ServiceStatus,
  serviceDate?: string
): Promise<Booking[]> => {
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error(`User not found.`);
  }

  const bookings = await prismaClient.booking.findMany({
    where: {
      user_id: userId,
      service_status: serviceStatus,
      service_date: serviceDate,
    },
  });
  return bookings;
};

const getTechnicianBookings = async (
  technicianId: string,
  serviceStatus?: ServiceStatus,
  serviceDate?: string
): Promise<Booking[]> => {
  const technician = await prismaClient.technician.findUnique({
    where: { id: technicianId },
  });

  if (!technician) {
    throw new Error(`Technician not found.`);
  }

  const bookings = await prismaClient.booking.findMany({
    where: {
      technician_id: technicianId,
      service_status: serviceStatus,
      service_date: serviceDate,
    },
  });

  return bookings;
};

const editBooking = async (
  bookingId: string,
  updatedBooking: UpdateBookingInput
): Promise<Booking> => {
  const existing = await prismaClient.booking.findUnique({
    where: { id: bookingId },
  });

  if (!existing) {
    throw new Error(`Booking not found.`);
  }

  const booking = await prismaClient.booking.update({
    where: {
      id: bookingId,
    },
    data: updatedBooking,
  });
  return booking;
};

const deleteBookingById = async (bookingId: string): Promise<Booking> => {
  const existing = await prismaClient.booking.findUnique({
    where: { id: bookingId },
  });

  if (!existing) {
    throw new Error(`Booking not found.`);
  }

  const booking = await prismaClient.booking.delete({
    where: {
      id: bookingId,
    },
  });
  return booking;
};

export {
  createBooking,
  deleteBookingById,
  editBooking,
  getTechnicianBookings,
  getUserBookings,
};
