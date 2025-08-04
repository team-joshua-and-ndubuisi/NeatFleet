import { Router } from 'express';

import {
  userIdValidator,
  checkValidations,
} from '../middleware/inputValidators';

import {
  searchUsers,
  getUsers,
  getSingleUser,
} from '../controllers/usersController';

const router = Router();

router.get('/search', searchUsers);
router.get('/', getUsers);
router.get('/:userId', userIdValidator, checkValidations, getSingleUser);

router.post('/addresses', createAddress); // POST /api/users/addresses
router.get('/addresses', getUserAddresses); // GET /api/users/addresses
router.patch('/addresses/:address_id', updateAddress); // PATCH /api/users/addresses/:address_id
router.delete('/addresses/:address_id', deleteAddress); // DELETE /api/users/addresses/:address_id

export default router;
