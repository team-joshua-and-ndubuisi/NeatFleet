import prismaClient from '../config/prisma';

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

export { createTechnician };
