import { Router } from 'express';

import {
  deleteProfile,
  editProfile,
  loginUser,
  registerUser,
  userProfile,
} from '../controllers/authController';

import { isAuth } from '../middleware/authMiddleware';
import {
  checkValidations,
  emailValidator,
  first_nameValidator,
  last_nameValidator,
  passwordValidator,
} from '../middleware/inputValidators';

const router = Router();

router.post(
  '/register',
  first_nameValidator,
  last_nameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
  registerUser
);
router.post(
  '/login',
  emailValidator,
  passwordValidator,
  checkValidations,
  loginUser
);
router.get('/profile', isAuth, userProfile);

router.put(
  '/profile',
  isAuth,
  first_nameValidator,
  last_nameValidator,
  emailValidator,
  checkValidations,
  editProfile
);
router.delete('/profile', isAuth, deleteProfile);

export default router;
