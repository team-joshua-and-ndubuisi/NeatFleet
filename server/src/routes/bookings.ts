import { Router } from 'express';
import {
  addBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from '../controllers/bookingsController';
const router = Router();

router.post('/', addBooking);
router.get('/', getBookings);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);

export default router;
