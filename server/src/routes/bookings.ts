import { Router } from 'express';
import {
  addBooking,
  checkoutStripe,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  getInvoiceForBooking,
} from '../controllers/bookingsController';
const router = Router();

router.post('/create-checkout-session', checkoutStripe);
router.post('/', addBooking);
router.get('/', getBookings);
router.get('/:bookingId', getBooking);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);

router.get('/:bookingId/invoice', getInvoiceForBooking);
// router.post('/:bookingId/invoice', createInvoiceForBooking);

export default router;
