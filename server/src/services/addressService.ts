import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly

const getUserAddresses = async (userId: string) => {
  try {
    const addresses = await prismaClient.address.findMany({
      where: { user_id: userId },
    });

    return addresses;
  } catch (error: any) {
    throw new Error(
      `Error fetching addresses for userId ${userId}: ${error.message}`
    );
  }
};

const createAddress = async ({
  userId,
  street,
  city,
  state,
  zip,
  latitude,
  longitude,
}: {
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude?: number;
  longitude?: number;
}) => {
  try {
    const address = await prismaClient.address.create({
      data: {
        user_id: userId,
        street,
        city,
        state,
        zip,
        latitude,
        longitude,
      },
    });
    return address;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export { createAddress, getUserAddresses };
