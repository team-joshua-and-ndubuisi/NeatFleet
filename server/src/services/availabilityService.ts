import prismaClient from '../config/prisma';
import { addDays, format } from 'date-fns';
import { TimeBlock } from '../../generated/prisma';

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

async function getAvailableTimeBlocks(serviceId: string, date: string) {
  const result: { time_block: string }[] = await prismaClient.$queryRaw<
    { time_block: TimeBlock }[]
  >`
    SELECT DISTINCT ta.time_block
    FROM technician_availabilities ta
    JOIN technicians_services ts ON ta.technician_id = ts.technician_id
    WHERE ts.service_id = ${serviceId}::uuid
      AND ta.available_date = ${date}
  `;

  // list all possible time blocks (matches enum)
  const allBlocks: TimeBlock[] = ['morning', 'afternoon', 'evening'];

  const resultBlocks = result.map(row => row.time_block);

  // build this with default value as false
  const availabilityMap: Record<TimeBlock, boolean> = {
    morning: false,
    afternoon: false,
    evening: false,
  };

  // update a specific timeblock property to true if it exist in resultBlock
  for (const block of allBlocks) {
    availabilityMap[block] = resultBlocks.includes(block);
  }

  return availabilityMap;
}

export { getUpcomingAvailableDatesByServiceId, getAvailableTimeBlocks };
