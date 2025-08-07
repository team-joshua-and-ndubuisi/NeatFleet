import { Router } from 'express';
import {
  addAvailabilities,
  deleteAvailability,
  updateAvailability,
} from '../controllers/technicianController';

const router = Router();

router.post('/:technicianId/availabilities', addAvailabilities);
router.patch(
  '/:technicianId/availabilities/:availabilityId',
  updateAvailability
);
router.delete(
  '/:technicianId/availabilities/:availabilityId',
  deleteAvailability
);

export default router;
