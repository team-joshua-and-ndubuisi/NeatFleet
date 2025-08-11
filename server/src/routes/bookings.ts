import { Router } from 'express';
import {
  addBooking,
  checkoutStripe,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from '../controllers/bookingsController';
import { isAuth } from '../middleware/authMiddleware';
import { addInvoice } from '../controllers/invoicesController';
const router = Router();

router.post('/create-checkout-session', checkoutStripe);
router.post('/', addBooking);
router.get('/', getBookings);
router.get('/:bookingId', getBooking);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);

// router.get('/:bookingId/invoice', isAuth, );
router.post('/:bookingId/invoice', isAuth, addInvoice);

export default router;
