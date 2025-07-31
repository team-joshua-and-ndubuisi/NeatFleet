import { Router } from 'express';
import { isAuth } from '../middleware/authMiddleware';
import authRoutes from './auth';
import bookingsRoutes from './bookings';
import usersRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', isAuth, usersRoutes);
router.use('/bookings', bookingsRoutes);

export default router;
