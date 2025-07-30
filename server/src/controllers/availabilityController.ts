// server/src/controllers/availabilityController.ts
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import {
  getUpcomingAvailableDatesByServiceId,
  getAvailableTimeBlocks,
} from '../services/availabilityService';
import { logger } from '../config/logger';

// @desc    Get upcoming availability dates for a specific service
// @route   GET api/availabilities/service/:serviceId
// @access  Public
const getServiceDateAvailability = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { service_id } = req.params;
    const serviceId = service_id;

    logger.info(`Fetching availability for service ${serviceId}`);
    const dates = await getUpcomingAvailableDatesByServiceId(serviceId);
    res.status(200).json({ available_dates: dates });
  }
);

// @desc
// @route
// @access  Public
const getServiceTimeBlockAvailability = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { service_id } = req.params;
    const { date } = req.query;
    const serviceId = service_id;

    logger.info(`Fetching availability time block for service ${serviceId}`);
    const timeBlocks = await getAvailableTimeBlocks(serviceId);
    res.status(200).json({ time_blocks: timeBlocks });
  }
);

export { getServiceDateAvailability, getServiceTimeBlockAvailability };
