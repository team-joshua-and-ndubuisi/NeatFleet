import { Router } from 'express';
import { isAuth } from '../middleware/authMiddleware';
import authRoutes from './auth';
import availabilityRoutes from './availabilities';
import bookingsRoutes from './bookings';
import servicesRoutes from './services';
import usersRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', isAuth, usersRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/services', servicesRoutes);
router.use('/availabilities', availabilityRoutes);

export default router;
