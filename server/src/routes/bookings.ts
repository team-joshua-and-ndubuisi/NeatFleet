import { Router } from 'express';
import {
  addBooking,
  createPaymentIntent,
  verifyPaymentIntent,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from '../controllers/bookingsController';
const router = Router();
router.post('/', addBooking);
router.get('/', getBookings);
router.get('/:bookingId', getBooking);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);
router.post('/create-payment-intent', createPaymentIntent);
router.get('/verify-payment-intent', verifyPaymentIntent);
export default router;
