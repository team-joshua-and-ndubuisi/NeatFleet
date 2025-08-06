import { Router } from 'express';
import {
  addAvailability,
  deleteAvailability,
  updateAvailability,
} from '../controllers/technicianController';

const router = Router();

router.post('/:technician_id/availabilities/:availability_id', addAvailability);
router.patch(
  '/:technician_id/availabilities/:availability_id',
  updateAvailability
);
router.delete(
  '/:technician_id/availabilities/:availability_id',
  deleteAvailability
);

export default router;
