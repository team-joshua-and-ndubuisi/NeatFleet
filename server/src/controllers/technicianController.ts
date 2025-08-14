import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { TimeBlock } from '../../generated/prisma';
import { validateId } from '../lib/validation';
import {
  editAvailability,
  removeAvailability,
  setTechnicianAvailabilities,
} from '../services/technicianService';

type availabilityInput = { availableDate: string; timeBlock: TimeBlock };
type requestWithUser = Request & {
  user: {
    role: string;
    technicianId: string;
  };
};
// @desc    Create new availability
// @route   POST technicians/:technicianId/availabilities
// @access  Private
const addAvailabilities = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // const { technicianId } = req.params;

    const technicianId = (req as requestWithUser).user.technicianId;
    validateId(technicianId);

    const newAvailabilities: availabilityInput[] = req.body;

    const result = await setTechnicianAvailabilities({
      technicianId,
      newAvailabilities,
    });

    res.status(201).json(result);
  }
);

// @desc    Update availability by ID
// @route   PATCH technicians/:technicianId/availabilities/:availabilityId
// @access  Private
const updateAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { availabilityId } = req.params;
    validateId(availabilityId);

    const newAvailability: availabilityInput = req.body;
    const result = await editAvailability({ availabilityId, newAvailability });
    res.status(200).json(result);
  }
);

// @desc    Delete availability by ID
// @route   DELETE technicians/:technicianId/availabilities/:availabilityId
// @access  Private
const deleteAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { availabilityId } = req.params;
    validateId(availabilityId);

    const result = await removeAvailability(availabilityId);
    res.status(200).json(result);
  }
);

export { addAvailabilities, deleteAvailability, updateAvailability };
