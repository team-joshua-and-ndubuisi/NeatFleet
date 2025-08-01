import { Router } from 'express';

import { getServices } from '../controllers/servicesController';

const router = Router();

router.get('/', getServices);

export default router;
