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
import {
  checkValidations,
  invoiceValidator,
} from '../middleware/inputValidators';
import { addInvoice, getInvoice } from '../controllers/invoicesController';
const router = Router();

router.post('/create-checkout-session', checkoutStripe);
router.post('/', addBooking);
router.get('/', getBookings);
router.get('/:bookingId', getBooking);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);

router.get('/:bookingId/invoice', isAuth, getInvoice);
router.post(
  '/:bookingId/invoice',
  isAuth,
  invoiceValidator,
  checkValidations,
  addInvoice
);

export default router;
