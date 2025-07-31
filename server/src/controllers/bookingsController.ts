import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ServiceStatus } from '../../generated/prisma';
import prisma from '../config/prisma';
import { validateId } from '../lib/validation';
import {
  createBooking,
  deleteBookingById,
  editBooking,
  getTechnicianBookings,
  getUserBookings,
} from '../services/bookingService';
const User = prisma.user;

// @desc    Register new user
// @route   POST /register
// @access  Public
const addBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const newBooking = req.body;
    const result = await createBooking(newBooking);
    res.status(201).json(result);
  }
);

const updateBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { bookingId } = req.params;
    validateId(bookingId);

    const newBooking = req.body;
    const result = await editBooking(bookingId, newBooking);
    res.status(200).json(result);
  }
);

const deleteBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { bookingId } = req.params;
    validateId(bookingId);

    const result = await deleteBookingById(bookingId);
    res.status(200).json(result);
  }
);

const getBookings = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId, technicianId, serviceStatus, serviceDate } = req.query;

    if (userId && technicianId) {
      res.status(400).json({
        message:
          'Please provide either a userId or a technicianId, but not both.',
      });
      return;
    }

    if (userId) {
      validateId(userId as string);

      const result = await getUserBookings(userId as string);
      res.status(200).json(result);
    } else if (technicianId) {
      validateId(technicianId as string);

      const result = await getTechnicianBookings(
        technicianId as string,
        serviceStatus as ServiceStatus,
        serviceDate as string
      );
      res.status(200).json(result);
    } else {
      res
        .status(400)
        .json({ message: 'Please provide either a userId or a technicianId.' });
    }
  }
);

export { addBooking, deleteBooking, getBookings, updateBooking };
