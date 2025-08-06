import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateId } from '../lib/validation';
import {
  editAvailability,
  getTechAvailabilities,
  setTechnicianAvailability,
} from '../services/technicianService';

const availabilities1 = [
  { date: '2023-03-32', time_block: ['morning', 'morning'] },
  { date: '2023-03-33', time_block: ['morning', 'morning', 'morning'] },
  { date: '2023-03-34', time_block: ['morning'] },
];

availabilities1.forEach(item => {
  const date = item.date;
  item.time_block.forEach(async item => {
    await setTechnicianAvailability({
      techId: '',
      availableDate: date,
      timeBlock: item,
    });
  });
});

const availabilities = [
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
  {
    available_date: '2023-03-32',
    time_block: 'morning',
  },
];

// @desc    Create new availability
// @route   POST technicians/:technician_id/availabilities
// @access  Private
const addAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const newAvailability = req.body;
    availabilities.map(async item => {
      await setTechnicianAvailability(newAvailability);
    });
    res.status(201).json(result);
  }
);

// @desc    Update availability by ID
// @route   PATCH technicians/:technician_id/availabilities/:availability_id
// @access  Private
const updateAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { availabilityId } = req.params;
    validateId(availabilityId);

    const newAvailability = req.body;
    const result = await editAvailability(availabilityId, newAvailability);
    res.status(200).json(result);
  }
);

// @desc    Delete availability by ID
// @route   DELETE technicians/:technician_id/availabilities/:availability_id
// @access  Private
const deleteAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { availabilityId } = req.params;
    validateId(availabilityId);

    const result = await getTechAvailabilities(availabilityId);
    res.status(200).json(result);
  }
);

export { addAvailability, deleteAvailability, updateAvailability };
