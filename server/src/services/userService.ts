import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly
import { User } from '../../generated/prisma';

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

export { getUserIdByEmail, createUser, deactivateUserByEmail };
