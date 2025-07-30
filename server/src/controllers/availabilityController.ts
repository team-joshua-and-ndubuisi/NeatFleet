// server/src/controllers/availabilityController.ts
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { getUpcomingAvailableDatesByServiceId } from '../services/availabilityService';
import { logger } from '../config/logger';

// @desc    Get upcoming availability dates for a specific service
// @route   GET api/availabilities/service/:serviceId
// @access  Public
const getServiceAvailability = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { service_id } = req.params;
    const serviceId = service_id;

    logger.info(`Fetching availability for service ${serviceId}`);
    const dates = await getUpcomingAvailableDatesByServiceId(serviceId);
    res.status(200).json({ available_dates: dates });
  }
);

export { getServiceAvailability };
