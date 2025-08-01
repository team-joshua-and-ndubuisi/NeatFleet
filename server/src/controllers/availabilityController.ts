// server/src/controllers/availabilityController.ts
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import {
  getTechniciansByServiceDateAndTimeBlock,
  getUpcomingAvailableDatesByServiceId,
  getOpenTimeBlocks,
} from '../services/availabilityService';
import { logger } from '../config/logger';
import { TimeBlock } from '../../generated/prisma';

/**
 * The following allows one step by step to progressively
 * builds up info. So that it can accomadate step by step booking flow.
 */

/**
 * @desc    Get availability information for a specific service.
 *          Behavior depends on query parameters:
 *          - STEP1 - No query: returns available dates
 *          - STEP2 - ?date=YYYY-MM-DD: returns available time blocks on that date
 *          - STEP3 - ?date=YYYY-MM-DD&time_block=morning: returns available technicians (future)
 * @route   GET /api/availabilities/service/:service_id
 * @access  Public
 */
const getServiceAvailability = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, time_block } = req.query;

    if (!date && !time_block) {
      //STEP 1: Return list of available dates for the service
      await getAvailableDate(req, res, next);
      return;
    }

    if (date && !time_block) {
      //STEP 2: Return time blocks available for that date and service
      await getAvailableTimeBlocks(req, res, next);
      return;
    }

    if (date && time_block) {
      //STEP 3: Return available technicians for that service, date, and time block
      await getAvailableTechnicians(req, res, next);
      return;
    }

    res.status(400).json({ error: 'Invalid query parameters' });
    return;
  }
);

/**
 * @desc    Returns upcoming availability dates for a specific service.
 *          This function is used internally by the main availability handler.
 * @route   GET /api/availabilities/service/:service_id
 * @access  Public
 */
const getAvailableDate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { service_id } = req.params;
    const serviceId = service_id;

    logger.info(`Fetching availability for service ${serviceId}`);
    const dates = await getUpcomingAvailableDatesByServiceId(serviceId);
    res.status(200).json({ available_dates: dates });
  }
);

/**
 * @desc    Returns available time blocks for a specific service on a given date.
 *          Expects a `date` query parameter in YYYY-MM-DD format.
 * @route   GET /api/availabilities/service/:service_id?date=YYYY-MM-DD
 * @access  Public
 */
const getAvailableTimeBlocks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { service_id } = req.params;
    const { date } = req.query;

    if (typeof date !== 'string') {
      res
        .status(400)
        .json({ error: 'Invalid or missing date query parameter' });
      return;
    }

    const serviceId = service_id;

    logger.info(
      `Fetching availability time blocks for service ${serviceId} on date ${date}`
    );

    const timeBlocks = await getOpenTimeBlocks(serviceId, date);

    res.status(200).json({ time_blocks: timeBlocks });
  }
);

/**
 * @desc    Returns technicians available for a specific service, date, and time block.
 *          Requires both `date` and `time_block` query parameters.
 * @route   GET /api/availabilities/service/:service_id?date=YYYY-MM-DD&time_block=morning
 * @access  Public
 */
const getAvailableTechnicians = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { service_id } = req.params;
    const { date, time_block } = req.query;

    // Define the valid time blocks as string literals, and mark as 'const' for type inference
    const TIME_BLOCK_OPTIONS = ['morning', 'afternoon', 'evening'] as const;

    // Define a union type: 'morning' | 'afternoon' | 'evening'
    type TimeBlockLiteral = (typeof TIME_BLOCK_OPTIONS)[number]; // 'morning' | 'afternoon' | 'evening'

    if (
      typeof date !== 'string' ||
      typeof time_block !== 'string' ||
      !TIME_BLOCK_OPTIONS.includes(time_block as TimeBlockLiteral)
    ) {
      res.status(400).json({
        error: 'Missing or invalid `date` or `time_block` query parameter',
      });
      return;
    }

    logger.info(
      `Fetching available technicians for service ${service_id} on ${date} during ${time_block}`
    );

    const technicians = await getTechniciansByServiceDateAndTimeBlock(
      service_id,
      date,
      time_block as TimeBlock
    );

    res.status(200).json({ technicians });
  }
);

export { getServiceAvailability };
