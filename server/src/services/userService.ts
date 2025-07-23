import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly

const getUserIdByEmail = async (email: string) => {
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

const deactivateUserByEmail = async (email: string) => {
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

const createUser = async ({
  first_name,
  last_name,
  email,
  phone,
  password,
}: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const user = await prismaClient.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email,
        phone,
        password: password,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export { getUserIdByEmail, createUser, deactivateUserByEmail };
