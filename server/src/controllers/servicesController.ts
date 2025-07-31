import asyncHandler from 'express-async-handler';
import { logger } from '../config/logger';
import { Request, Response, NextFunction } from 'express';
import { getAllServices } from '../services/serviceService';

// @desc    Get all services
// @route   GET /services
// @access  Public
const getServices = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Attempting to get all Services`);
    const services = await getAllServices();
    res.status(200).json({ services });
  }
);

export { getServices };
