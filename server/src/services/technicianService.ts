import {
  Technician,
  TechnicianAvailability,
  TimeBlock,
} from '../../generated/prisma';
import prismaClient from '../config/prisma';
import { AppError } from '../types/error';
import { calculateYears } from '../utils/dateUtils'; // assuming your utility lives here
import { getUserIdByEmail } from './userService';

const createTechnician = async (userId: string): Promise<Technician> => {
  try {
    const technician = await prismaClient.technician.create({
      data: {
        user_id: userId,
      },
    });
    return technician;
  } catch (error: any) {
    throw new Error(`Error setting user as technician: ${error.message}`);
  }
};

const isTechnician = async (email: string): Promise<boolean> => {
  try {
    const userID = await getUserIdByEmail(email);
    if (!userID) {
      throw new Error(`User with email ${email} not found.`);
    }

    // query with userID, if return result return true, otherwise return false
    const exists = await prismaClient.technician.findUnique({
      where: { user_id: userID },
    });

    return exists !== null;
  } catch (error: any) {
    throw new Error(
      `Error checking if user is a technician, user email ${email}: ${error.message}`
    );
  }
};

type TechnicianAvailabilityInput = {
  technicianId: string;
  newAvailabilities: { availableDate: string; timeBlock: TimeBlock }[];
};

const setTechnicianAvailabilities = async ({
  technicianId,
  newAvailabilities,
}: TechnicianAvailabilityInput) => {
  try {
    const technician = await prismaClient.technician.findUnique({
      where: { id: technicianId },
    });
    if (!technician) {
      throw new Error(`Technician not found.`);
    }

    const availabilities = await prismaClient.technicianAvailability.createMany(
      {
        data: newAvailabilities.map(availability => ({
          technician_id: technicianId,
          available_date: availability.availableDate,
          time_block: availability.timeBlock,
        })),
        skipDuplicates: true,
      }
    );

    return {
      count: availabilities.count,
      message: `Successfully created ${availabilities.count} availabilities`,
    };
  } catch (err) {
    throw new Error(`Error during availability creation: ${err}`);
  }
};

type EditAvailabilityInput = {
  availabilityId: string;
  newAvailability: { availableDate: string; timeBlock: TimeBlock };
};

const editAvailability = async ({
  availabilityId,
  newAvailability,
}: EditAvailabilityInput) => {
  try {
    const availability = await prismaClient.technicianAvailability.findUnique({
      where: { id: availabilityId },
    });
    if (!availability) {
      throw new Error(`Availability not found.`);
    }

    const updatedAvailability =
      await prismaClient.technicianAvailability.update({
        where: { id: availabilityId },
        data: {
          available_date: newAvailability.availableDate,
          time_block: newAvailability.timeBlock,
        },
      });

    return updatedAvailability;
  } catch (err) {
    throw new Error(`Error during availability creation: ${err}`);
  }
};

const removeAvailability = async (availabilityId: string) => {
  try {
    const availability = await prismaClient.technicianAvailability.findUnique({
      where: { id: availabilityId },
    });
    if (!availability) {
      throw new Error(`Availability not found.`);
    }

    const result = await prismaClient.technicianAvailability.delete({
      where: { id: availabilityId },
    });

    return result;
  } catch (err) {
    throw new Error(`Error during availability creation: ${err}`);
  }
};

//This returns the entire row, until we figure what we exactly need
const getTechAvailabilities = async (
  techId: string
): Promise<TechnicianAvailability[]> => {
  try {
    const availabilities = await prismaClient.technicianAvailability.findMany({
      where: {
        technician_id: techId,
      },
    });

    if (!availabilities || availabilities.length === 0) {
      throw new Error(
        `No availabilities found for technician with ID ${techId}`
      );
    }

    return availabilities;
  } catch (error: any) {
    throw new Error(
      `Error fetching availabilities for technician with ID ${techId}: ${error.message}`
    );
  }
};

const getTechIdByEmail = async (email: string): Promise<string> => {
  try {
    const techId = await prismaClient.technician.findFirst({
      where: {
        user: {
          email,
        },
      },
      select: {
        id: true,
      },
    });

    if (!techId) {
      throw new Error(`Technician with email ${email} not found`);
    }

    return techId.id;
  } catch (error: any) {
    throw new Error(
      `Error fetching technician with email ${email}   Message: ${error.message}`
    );
  }
};

const getTechnicianId = async (userId: string): Promise<string> => {
  const technician = await prismaClient.technician.findUnique({
    where: { user_id: userId },
    select: { id: true },
  });

  if (!technician) {
    throw new Error(`Technician with userId ${userId} not found`);
  }

  return technician.id;
};

const getTechnicianProfile = async (userId: string) => {
  const technician = await fetchTechnicianWithBookings(userId);
  const today = getToday();

  const upcomingBookings = technician.Booking.filter(b =>
    isUpcoming(b.service_date, today)
  );
  const pastBookings = technician.Booking.filter(b =>
    isPast(b.service_date, today)
  );

  const formatBookings = (bookings: typeof technician.Booking) => {
    return bookings.map(formatBooking);
  };

  return {
    role: 'technician',
    first_name: technician.user.first_name,
    last_name: technician.user.last_name,
    email: technician.user.email,
    phone: technician.user.phone,
    rating_score: technician.current_rating,
    stats: {
      bookings_completed: countCompletedBookings(technician),
      years_on_platform: calculateYears(technician.user.created_at),
    },
    bookings: {
      upcoming: formatBookings(upcomingBookings),
      past: formatBookings(pastBookings),
    },
  };
};

const fetchTechnicianWithBookings = async (userId: string) => {
  const technician = await prismaClient.technician.findUnique({
    where: { user_id: userId },
    include: {
      user: true,
      Booking: {
        include: {
          user: true, // client's name
          service: true, // service name
        },
        orderBy: { service_date: 'desc' },
      },
    },
  });

  if (!technician) throw new AppError('Technician not found', 404);
  return technician;
};

const getToday = (): string => {
  return new Date().toISOString().split('T')[0]; // returns YYYY-MM-DD
};

const isUpcoming = (date: string, today: string): boolean => date >= today;
const isPast = (date: string, today: string): boolean => date < today;

const formatBooking = (b: any) => ({
  booking_id: b.id,
  client_name: `${b.user.first_name} ${b.user.last_name}`,
  service_name: b.service.name,
  status: b.service_status,
  date: b.service_date,
  rating_score: b.rating_score,
  rating_comment: b.rating_comment,
});

const countCompletedBookings = (technician: any): number => {
  return technician.Booking.filter(
    (b: { service_status: string }) => b.service_status === 'completed'
  ).length;
};

export {
  createTechnician,
  editAvailability,
  getTechAvailabilities,
  getTechIdByEmail,
  getTechnicianId,
  getTechnicianProfile,
  isTechnician,
  removeAvailability,
  setTechnicianAvailabilities,
};
