import { Router } from 'express';

import {
  userIdValidator,
  checkValidations,
  addressValidator,
} from '../middleware/inputValidators';

import {
  searchUsers,
  getUsers,
  getSingleUser,
} from '../controllers/usersController';
import {
  addAddress,
  // deleteAddress,
  getUserAddresses,
  updateAddress,
} from '../controllers/addressController';

const router = Router();

router.post('/addresses', addressValidator, checkValidations, addAddress); // POST /api/users/addresses
router.get('/addresses', getUserAddresses); // GET /api/users/addresses
router.patch(
  '/addresses/:address_id',
  addressValidator,
  checkValidations,
  updateAddress
); // PATCH /api/users/addresses/:address_id
// router.delete('/addresses/:address_id', deleteAddress); // DELETE /api/users/addresses/:address_id

router.get('/search', searchUsers);
router.get('/', getUsers);
router.get('/:userId', userIdValidator, checkValidations, getSingleUser);

export default router;
