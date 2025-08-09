import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly
import { User } from '../../generated/prisma';
import { AppError, ExtendedErrorT } from '../types/error';
import { logger } from '../config/logger';
import { calculateYears } from '../utils/dateUtils';
import { numOfCompletedBookings } from './bookingService';

const getUserIdByEmail = async (email: string): Promise<string | null> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return user?.id || null; // Return the ID or null if not found
  } catch (error: any) {
    throw new Error(
      `Error fetching user id with email ${email}: ${error.message}`
    );
  }
};

const deactivateUserByEmail = async (email: string): Promise<User> => {
  try {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    const updatedUser = await prismaClient.user.update({
      where: { email },
      data: { is_active: false },
    });

    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error deactivating user with email ${email}: ${error.message}`
      );
    }
    throw new Error(`Unknown error deactivating user with email ${email}`);
  }
};

type CreateUserInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

const createUser = async ({
  first_name,
  last_name,
  email,
  phone,
  password,
}: CreateUserInput): Promise<User> => {
  try {
    const user = await prismaClient.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        password,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getUserProfile = async (userId: string) => {
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      Booking: {
        include: {
          technician: {
            include: {
              user: true,
            },
          },
          service: true,
        },
        orderBy: { service_date: 'desc' },
      },
    },
  });

  if (!user) throw new AppError('User not found', 404);

  const today = new Date().toISOString().split('T')[0];

  const upcoming = user.Booking.filter(b => b.service_date >= today);
  const past = user.Booking.filter(b => b.service_date < today);

  const mapBooking = (b: (typeof user.Booking)[number]) => ({
    booking_id: b.id,
    technician_name: `${b.technician.user.first_name} ${b.technician.user.last_name}`,
    service_name: b.service.name,
    status: b.service_status,
    date: b.service_date,
    rating_score: b.rating_score,
    rating_comment: b.rating_comment,
  });

  return {
    role: 'customer',
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    bookings: {
      upcoming: upcoming.map(mapBooking),
      past: past.map(mapBooking),
    },
    stats: {
      bookings_completed: await numOfCompletedBookings(userId, 'customer'),
      years_on_platform: calculateYears(user.created_at),
    },
  };
};

const getUserRole = async (
  userId: string
): Promise<'technician' | 'customer'> => {
  const technician = await prismaClient.technician.findUnique({
    where: { user_id: userId },
    select: { id: true },
  });

  return technician ? 'technician' : 'customer';
};

export {
  getUserIdByEmail,
  createUser,
  deactivateUserByEmail,
  getUserProfile,
  getUserRole,
};
