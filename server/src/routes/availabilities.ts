import { Router } from 'express';
import {
  getServiceDateAvailability,
  getServiceTimeBlockAvailability,
} from '../controllers/availabilityController';

const router = Router();

router.get('/service/:service_id', getServiceDateAvailability);

// '/service/:service_id/timeblocks?date=YYYY-MM-DD'
router.get('/service/:service_id/timeblocks', getServiceTimeBlockAvailability);

export default router;
