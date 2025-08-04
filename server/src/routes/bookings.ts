import { Router } from 'express';
import {
  addBooking,
  checkoutStripe,
  deleteBooking,
  getBookings,
  updateBooking,
} from '../controllers/bookingsController';
const router = Router();

router.post('/create-checkout-session', checkoutStripe);
router.post('/', addBooking);
router.get('/', getBookings);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);

export default router;
