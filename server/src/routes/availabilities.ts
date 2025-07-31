import { Router } from 'express';
import { getServiceAvailability } from '../controllers/availabilityController';

const router = Router();

router.get('/service/:service_id', getServiceAvailability);

export default router;
