import prismaClient from '../config/prisma'; // Ensure your db connection is set up correctly
import { Address } from '../../generated/prisma';
import { AppError } from '../types/error';

type CreateAddressInput = {
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude?: number;
  longitude?: number;
  isPrimary?: boolean;
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

const getAddressesForUser = async (userId: string): Promise<Address[]> => {
  try {
    return await prismaClient.address.findMany({
      where: { user_id: userId },
      orderBy: [
        { isPrimary: 'desc' }, // Primary first
      ],
    });
  } catch (error: any) {
    throw new AppError(
      `Error fetching addresses for userId ${userId}: ${error.message}`,
      500
    );
  }
};

// Create Address (transactional when isPrimary=true)
const createAddress = async ({
  userId,
  street,
  city,
  state,
  zip,
  latitude,
  longitude,
  isPrimary,
}: CreateAddressInput): Promise<Address> => {
  const makePrimary = isPrimary === true;
  console.log('CHECK POINT - is primary? ', isPrimary);

  try {
    const created = await prismaClient.$transaction(async tx => {
      if (makePrimary) {
        // Flip off any existing primary for this user
        await tx.address.updateMany({
          where: { user_id: userId, isPrimary: true },
          data: { isPrimary: false },
        });
      }

      // Create the new address
      const address = await tx.address.create({
        data: {
          user_id: userId,
          street,
          city,
          state,
          zip,
          latitude,
          longitude,
          isPrimary: makePrimary,
        },
      });

      return address;
    });

    return created;
  } catch (e: any) {
    // Handle unique violations:
    // - composite unique (user_id, street, city, state, zip)
    // - partial unique index on (user_id) where is_primary = true (if you add it)
    if (e?.code === 'P2002') {
      throw new AppError(
        'Address conflicts with an existing record or primary already set.',
        409
      );
    }

    throw new AppError(`Error creating address: ${e.message}`, 500);
  }
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
