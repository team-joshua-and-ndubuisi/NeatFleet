import { Router } from 'express';
import { getServiceAvailabilities } from '../controllers/availabilitiesController';

const router = Router();

router.get('/service/:service_id', getServiceAvailabilities);

export default router;
