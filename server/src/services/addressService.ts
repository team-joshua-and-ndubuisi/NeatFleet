import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly
import { Address } from '../../generated/prisma';
import { AppError } from '../types/error';

const getAddressesForUser = async (userId: string): Promise<Address[]> => {
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

type CreateAddressInput = {
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude?: number;
  longitude?: number;
};

const createAddress = async ({
  userId,
  street,
  city,
  state,
  zip,
  latitude,
  longitude,
}: CreateAddressInput): Promise<Address> => {
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

type UpdateAddressInput = {
  addressId: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  isPrimary?: boolean;
};

const updateUserAddress = async ({
  addressId,
  userId,
  street,
  city,
  state,
  zip,
  latitude,
  longitude,
  isPrimary,
}: UpdateAddressInput) => {
  // Verify address ownership
  const address = await prismaClient.address.findUnique({
    where: { id: addressId },
  });

  if (!address || address.user_id !== userId) {
    throw new AppError('Address not found or unauthorized', 404);
  }

  const returnAddress = await prismaClient.address.update({
    where: { id: addressId },
    data: {
      street,
      city,
      state,
      zip,
      latitude,
      longitude,
      ...(isPrimary !== undefined && { isPrimary }),
    },
  });

  return returnAddress;
};

export { createAddress, getAddressesForUser, updateUserAddress };
