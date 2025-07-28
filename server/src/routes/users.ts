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

export default router;
