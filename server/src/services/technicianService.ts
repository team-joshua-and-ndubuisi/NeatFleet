import prismaClient from '../config/prisma';
import { getUserIdByEmail } from './userService';
import { Technician, TechnicianAvailability } from '../../generated/prisma';

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
      `Error setting user as technician, user email ${email}: ${error.message}`
    );
  }
};

//ISSUE with return type
const getTechnicianRating = async (userId: string): Promise<number | null> => {
  try {
    const technicianRating = await prismaClient.technician.findUnique({
      where: { user_id: userId },
      select: { current_rating: true },
    });

    if (!technicianRating) {
      throw new Error(`Technician with user_id ${userId} not found`);
    }

    return technicianRating.current_rating?.toNumber() ?? null;
  } catch (error: any) {
    throw new Error(
      `Error fetching technician with id ${userId}  Message: ${error.message}`
    );
  }
};

//ISSUE with return type
const updateRating = async (
  userId: string,
  newRating: number
): Promise<number | null> => {
  try {
    const updatedTechnician = await prismaClient.technician.update({
      where: { user_id: userId },
      data: { current_rating: newRating },
      select: { current_rating: true },
    });

    return updatedTechnician.current_rating?.toNumber() ?? null;
  } catch (error: any) {
    throw new Error(
      `Error updating rating for technician with user_id ${userId}: ${error.message}`
    );
  }
};

const setTechnicianAvailability = async ({
  techId,
  availableDate,
  startTime,
  endTime,
}: {
  techId: string;
  availableDate: string;
  startTime: string;
  endTime: string;
}): Promise<TechnicianAvailability> => {
  try {
    const availability = await prismaClient.technicianAvailability.create({
      data: {
        technician_id: techId,
        available_date: availableDate,
        start_time: startTime,
        end_time: endTime,
      },
    });

    return availability;
  } catch (error: any) {
    throw new Error(
      `Error setting availability for technician ${techId}: ${error.message}`
    );
  }
};

// const getAllTechniciansInfo;

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

export {
  createTechnician,
  isTechnician,
  getTechnicianRating,
  updateRating,
  setTechnicianAvailability,
  getTechIdByEmail,
  getTechAvailabilities,
};
