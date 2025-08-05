import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { logger } from '../config/logger';
import prisma from '../config/prisma';
import { AppError } from '../types/error';
import { User as UserType } from '../../generated/prisma';
import { createAddress } from '../services/addressService';

// Create Address
const addAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { street, city, state, zip, latitude, longitude } = req.body;
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
    });

    logger.info(`Address created for user ${userId}`);
    res.status(201).json(address);
  }
);
// getUserAddresses, updateAddress, deleteAddress
export { addAddress };
