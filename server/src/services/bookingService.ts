import { Booking, ServiceStatus, TimeBlock } from '../../generated/prisma';
import prismaClient from '../config/prisma';

type CreateBookingInput = {
  user_id: string;
  service_id: string;
  technician_id: string;
  service_date: string;
  time_block: TimeBlock;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  service_notes?: string;
};

type UpdateBookingInput = Partial<CreateBookingInput>;

const createBooking = async (newBooking: CreateBookingInput): Promise<any> => {
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

  const existingBooking = await prismaClient.booking.findFirst({
    where: {
      technician_id: technician_id,
      service_date: newBooking.service_date,
      time_block: newBooking.time_block,
    },
  });

  if (existingBooking) {
    throw new Error(
      `Technician is already booked for ${newBooking.time_block} on ${newBooking.service_date}. Please choose a different time slot or technician.`
    );
  }

  const booking = await prismaClient.booking.create({ data: newBooking });
  return booking;
};

const getUserBookings = async (
  userId: string,
  serviceStatus?: ServiceStatus,
  serviceDate?: string,
  limit?: string
): Promise<any[]> => {
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error(`User not found.`);
  }

  const take = Number(limit);

  const bookings = await prismaClient.booking.findMany({
    where: {
      user_id: userId,
      service_status: serviceStatus,
      service_date: serviceDate,
    },
    take: limit ? take : undefined,
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      technician: {
        select: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
    },
  });
  return bookings;
};

const getTechnicianBookings = async (
  technicianId: string,
  serviceStatus?: ServiceStatus,
  serviceDate?: string,
  limit?: string
): Promise<any[]> => {
  const technician = await prismaClient.technician.findUnique({
    where: { id: technicianId },
  });

  if (!technician) {
    throw new Error(`Technician not found.`);
  }

  const take = Number(limit);

  const bookings = await prismaClient.booking.findMany({
    where: {
      technician_id: technicianId,
      service_status: serviceStatus,
      service_date: serviceDate,
    },
    take: limit ? take : undefined,
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      technician: {
        select: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
    },
  });

  return bookings;
};

const editBooking = async (
  bookingId: string,
  updatedBooking: UpdateBookingInput
): Promise<any> => {
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

const getBookingById = async (bookingId: string): Promise<Booking> => {
  const booking = await prismaClient.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      user: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      technician: {
        select: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found.`);
  }

  return booking;
}

const numOfCompletedBookings = async (
  id: string,
  role: 'technician' | 'customer' | 'admin'
): Promise<number> => {
  try {
    if (role === 'technician') {
      return await prismaClient.booking.count({
        where: {
          technician_id: id,
          service_status: 'completed',
        },
      });
    } else {
      return await prismaClient.booking.count({
        where: {
          user_id: id,
          service_status: 'completed',
        },
      });
    }
  } catch (error) {
    throw new Error(`Failed to count bookings: ${error}`);
  }
};

export {
  createBooking,
  deleteBookingById,
  editBooking,
  getBookingById,
  getTechnicianBookings,
  getUserBookings,
  numOfCompletedBookings,
};
