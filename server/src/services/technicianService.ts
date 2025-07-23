import prismaClient from '../config/prisma';
import { getUserIdByEmail } from './userService';

const createTechnician = async (userId: string) => {
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

const isTechnician = async (email: string) => {
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

const getTechnicianRating = async (userId: string) => {
  try {
    const technician = await prismaClient.technician.findUnique({
      where: { user_id: userId },
      select: { current_rating: true },
    });

    if (!technician) {
      throw new Error(`Technician with user_id ${userId} not found`);
    }

    return technician;
  } catch (error: any) {
    throw new Error(
      `Error fetching technician with id ${userId}  Message: ${error.message}`
    );
  }
};

const updateRating = async (userId: string, newRating: number) => {
  try {
    const updatedTechnician = await prismaClient.technician.update({
      where: { user_id: userId },
      data: { current_rating: newRating },
      select: { current_rating: true },
    });

    return updatedTechnician.current_rating;
  } catch (error: any) {
    throw new Error(
      `Error updating rating for technician with user_id ${userId}: ${error.message}`
    );
  }
};

// const getAllTechniciansInfo;
// const getTechAvailability;

export { createTechnician, isTechnician, getTechnicianRating, updateRating };
