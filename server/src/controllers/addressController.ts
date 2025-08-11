import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { logger } from '../config/logger';
import prisma from '../config/prisma';
import { AppError } from '../types/error';
import { User as UserType } from '../../generated/prisma';
import {
  createAddress,
  getAddressesForUser,
  updateUserAddress,
} from '../services/addressService';

// Create Address
const addAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { street, city, state, zip, latitude, longitude, isPrimary } =
      req.body;
    const userId = (req.user as UserType).id;

    if (!userId) throw new AppError('Unauthorized', 401);

    const address = await createAddress({
      userId,
      street,
      city,
      state,
      zip,
      latitude,
      longitude,
      isPrimary,
    });

    logger.info(`Address created for user ${userId}`);
    res.status(201).json(address);
  }
);

const getUserAddresses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as UserType).id;

    if (!userId) throw new AppError('Unauthorized', 401);

    const addresses = await getAddressesForUser(userId);

    res.status(200).json(addresses);
  }
);

const updateAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address_id } = req.params;
    const {
      street,
      city,
      state,
      zip,
      latitude = null,
      longitude = null,
      isPrimary,
    } = req.body;

    const userId = (req.user as UserType)?.id;
    if (!userId) throw new AppError('Unauthorized', 401);

    // Update and return the full address
    // Make sure address belongs to the user prior to updating
    const updatedAddress = await updateUserAddress({
      addressId: address_id,
      userId,
      street,
      city,
      state,
      zip,
      latitude,
      longitude,
      isPrimary,
    });

    res.status(200).json(updatedAddress);
  }
);

// deleteAddress
export { addAddress, getUserAddresses, updateAddress };
