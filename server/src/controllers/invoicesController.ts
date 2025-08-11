import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { logger } from '../config/logger';
import prisma from '../config/prisma'; // (kept for parity; remove if unused)
import { AppError } from '../types/error';
import { User as UserType } from '../../generated/prisma';
import {
  getInvoiceByBookingId,
  createInvoiceForBooking,
} from '../services/invoiceService';
import { getBookingById } from '../services/bookingService';
/**
 * @desc    Create invoice for a booking
 * @route   POST /api/bookings/:bookingId/invoice
 * @access  Private (booking owner, technician, or admin)
 * @body    { cost: number, tax_percent: number, total_cost?: number }
 */
const addInvoice = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as UserType)?.id;
    if (!userId) throw new AppError('Unauthorized', 401);

    const { bookingId } = req.params;

    // Ensure booking exists
    const booking = await getBookingById(bookingId);
    if (!booking) throw new AppError('Booking not found', 404);

    // Ownership check
    if (booking.user_id !== userId) {
      throw new AppError('Forbidden', 403);
    }
    const { cost, tax_percent: taxPercent } = req.body;

    const invoice = await createInvoiceForBooking({
      bookingId,
      cost,
      taxPercent,
    });

    logger.info(`Invoice created for booking ${bookingId}`);
    res.status(201).json(invoice);
  }
);

/**
 * @desc    Get invoice for a booking
 * @route   GET /api/bookings/:bookingId/invoice
 * @access  Private (booking owner, technician, or admin)
 */
const getInvoice = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as UserType)?.id;
  if (!userId) throw new AppError('Unauthorized', 401);

  const { bookingId } = req.params;

  // Ensure booking exists
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { user_id: true },
  });

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  // Ownership check
  if (booking.user_id !== userId) {
    throw new AppError('Forbidden', 403);
  }

  const invoice = await getInvoiceByBookingId(bookingId);
  if (!invoice) {
    throw new AppError('Invoice not found', 404);
  }

  res.status(200).json(invoice);
});

// /**
//  * @desc    Update invoice for a booking
//  * @route   PATCH /api/bookings/:bookingId/invoice
//  * @access  Private (booking owner, technician, or admin)
//  * @body    Partial<{ cost: number, tax_percent: number, total_cost: number }>
//  */
// const updateInvoice = asyncHandler(
//   async (req: Request, res: Response, _next: NextFunction) => {
//     const userId = (req.user as UserType)?.id;
//     if (!userId) throw new AppError('Unauthorized', 401);

//     const { bookingId } = req.params;

//     const updated = await updateInvoiceForBooking({
//       bookingId,
//       userId,
//       data: req.body,
//     });

//     if (!updated) throw new AppError('Invoice not found', 404);
//     res.status(200).json(updated);
//   }
// );

// /**
//  * @desc    Delete invoice for a booking
//  * @route   DELETE /api/bookings/:bookingId/invoice
//  * @access  Private (booking owner, technician, or admin)
//  */
// const removeInvoice = asyncHandler(
//   async (req: Request, res: Response, _next: NextFunction) => {
//     const userId = (req.user as UserType)?.id;
//     if (!userId) throw new AppError('Unauthorized', 401);

//     const { bookingId } = req.params;
//     await deleteInvoiceForBooking({ bookingId, userId });

//     logger.info(`Invoice deleted for booking ${bookingId}`);
//     res.status(204).end();
//   }
// );

export { addInvoice, getInvoice };
