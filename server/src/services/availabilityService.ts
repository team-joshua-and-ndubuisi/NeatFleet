import prismaClient from '../config/prisma';
import { addDays, format } from 'date-fns';

async function getUpcomingAvailableDatesByServiceId(
  serviceId: string
): Promise<string[]> {
  try {
    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

    const availabilities = await prismaClient.$queryRaw<
      { available_date: string }[]
    >`
      SELECT DISTINCT ta.available_date
      FROM technician_availabilities ta
      JOIN technicians_services ts ON ta.technician_id = ts.technician_id
      WHERE ts.service_id = ${serviceId}::uuid
        AND ta.available_date >= ${tomorrow}
      ORDER BY ta.available_date ASC
    `;

    return availabilities.map(a => a.available_date);
  } catch (error: any) {
    console.error(
      `Error retrieving availability for serviceId ${serviceId}:`,
      error
    );
    throw new Error('Failed to fetch available dates for service.');
  }
}

export { getUpcomingAvailableDatesByServiceId };
