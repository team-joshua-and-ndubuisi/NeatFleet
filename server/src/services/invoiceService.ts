import prismaClient from '../config/prisma';
import { Invoice } from '../../generated/prisma';

type CreateInvoiceInput = {
  bookingId: string;
  cost: number;
  taxPercent: number;
  totalCost: number;
};

const createInvoice = async (data: CreateInvoiceInput): Promise<Invoice> => {
  try {
    // Check if an invoice already exists for the booking
    const existing = await prismaClient.invoice.findUnique({
      where: { booking_id: data.bookingId },
    });

    if (existing) {
      throw new Error(`Invoice already exists for booking ${data.bookingId}`);
    }

    const totalCost = Number(
      (data.cost + (data.cost * data.taxPercent) / 100).toFixed(2)
    );

    const invoice = await prismaClient.invoice.create({
      data: {
        booking_id: data.bookingId,
        cost: data.cost,
        tax_percent: data.taxPercent,
        total_cost: totalCost,
      },
    });

    return invoice;
  } catch (error: any) {
    throw new Error(`Error creating invoice: ${error.message}`);
  }
};

const getInvoice = async (bookingId: string): Promise<Invoice | null> => {
  try {
    const invoice = await prismaClient.invoice.findUnique({
      where: {
        booking_id: bookingId,
      },
    });

    return invoice;
  } catch (error: any) {
    throw new Error(
      `Error fetching invoice for booking ${bookingId}: ${error.message}`
    );
  }
};

export { createInvoice, getInvoice };
