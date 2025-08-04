import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import { ServiceStatus } from '../../generated/prisma';
import { validateId } from '../lib/validation';
import {
  createBooking,
  deleteBookingById,
  editBooking,
  getTechnicianBookings,
  getUserBookings,
} from '../services/bookingService';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2025-03-31.basil' as any,
});

// @desc    Create Checkout Session
// @route   POST /api/bookings/create-checkout-session
// @access  Private
const checkoutStripe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Service',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode: 'custom',
      // The URL of your payment completion page
      return_url: `${process.env.CLIENT_BASE_URL}/service-catalog/booking/success`,
    });

    res
      .status(200)
      .json({ checkoutSessionClientSecret: session.client_secret });
  }
);

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const addBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const newBooking = req.body;
    const result = await createBooking(newBooking);
    res.status(201).json(result);
  }
);

// @desc    Update a booking by ID
// @route   PATCH /api/bookings/:bookingId
// @access  Private
const updateBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { bookingId } = req.params;
    validateId(bookingId);

    const newBooking = req.body;
    const result = await editBooking(bookingId, newBooking);
    res.status(200).json(result);
  }
);

// @desc    Delete a booking by ID
// @route   DELETE /api/bookings/:bookingId
// @access  Private
const deleteBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { bookingId } = req.params;
    validateId(bookingId);

    const result = await deleteBookingById(bookingId);
    res.status(200).json(result);
  }
);

// @desc    Get bookings by user or technician
// @route   GET /api/bookings
// @access  Private
type BookingQueries = {
  userId?: string;
  technicianId?: string;
  serviceStatus?: ServiceStatus;
  serviceDate?: string;
  limit?: string;
};

const getBookings = asyncHandler(
  async (
    req: Request<unknown, unknown, unknown, BookingQueries>,
    res: Response
  ): Promise<void> => {
    const { userId, technicianId, serviceStatus, serviceDate, limit } =
      req.query;

    if (userId && technicianId) {
      res.status(400).json({
        message:
          'Please provide either a userId or a technicianId, but not both.',
      });
      return;
    }

    if (userId) {
      validateId(userId);

      const result = await getUserBookings(userId, serviceStatus, serviceDate);
      res.status(200).json(result);
      return;
    }

    if (technicianId) {
      validateId(technicianId);

      const result = await getTechnicianBookings(
        technicianId,
        serviceStatus,
        serviceDate,
        limit
      );
      res.status(200).json(result);
      return;
    }

    res
      .status(400)
      .json({ message: 'Please provide either a userId or a technicianId.' });
  }
);

export {
  addBooking,
  checkoutStripe,
  deleteBooking,
  getBookings,
  updateBooking,
};
