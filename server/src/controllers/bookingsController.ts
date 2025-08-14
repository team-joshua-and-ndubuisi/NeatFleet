import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import { ServiceStatus } from '../../generated/prisma';
import { validateId } from '../lib/validation';
import {
  createBooking,
  deleteBookingById,
  editBooking,
  getBookingById,
  getTechnicianBookings,
  getUserBookings,
} from '../services/bookingService';
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2025-03-31.basil' as any,
});
// @desc    Create Payment intent
// @route   POST /api/bookings/create-payment-intent
// @access  Public
const createPaymentIntent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      amount, // amount in cents
      user_id,
      service_id,
      technician_id,
      metadata = {},
    } = req.body;
    if (!amount) {
      res.status(400).json({ message: 'Missing amount (in cents).' });
      return;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        user_id,
        service_id,
        technician_id,
        ...metadata,
      },
      payment_method_types: ['card'],
    });
    console.log(paymentIntent.client_secret);
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  }
);
//@desc   Verifies that the payment was sucessful
//@route  GET /api/payments/verify?payment_intent=<id>
//@access Public
const verifyPaymentIntent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const paymentIntentId = req.query.payment_intent as string;
    if (!paymentIntentId) {
      res.status(400).json({ message: 'Missing payment_intent query param.' });
      return;
    }
    try {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);
      res.status(200).json({ paymentIntent });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to retrieve payment intent', error: err });
    }
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

// @desc    Get booking by ID
// @route   GET /api/bookings/:bookingId
// @access  Private
const getBooking = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { bookingId } = req.params;
    validateId(bookingId);

    const result = await getBookingById(bookingId);
    res.status(200).json(result);
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
  createPaymentIntent,
  verifyPaymentIntent,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
};
