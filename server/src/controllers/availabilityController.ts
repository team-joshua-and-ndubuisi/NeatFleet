// server/src/controllers/availabilityController.ts
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import {
  getUpcomingAvailableDatesByServiceId,
  getOpenTimeBlocks,
} from '../services/availabilityService';
import { logger } from '../config/logger';

/**
 * @desc    Get availability information for a specific service.
 *          Behavior depends on query parameters:
 *          - No query: returns available dates
 *          - ?date=YYYY-MM-DD: returns available time blocks on that date
 *          - ?date=YYYY-MM-DD&time_block=morning: returns available technicians (future)
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

    // if (date && time_block) {
    //   //STEP 3: Return available technicians for that service, date, and time block
    //   getAvailableTechnicians(req, res, next);
    //   return;
    // }

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

export { getServiceAvailability };
