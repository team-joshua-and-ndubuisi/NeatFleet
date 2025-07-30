import { Router } from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import servicesRoutes from './services';
// const postsRoutes = require("./posts");
import { isAuth } from '../middleware/authMiddleware';

const router = Router();

router.use('/auth', authRoutes);
// router.use("/users", isAuth, usersRoutes);
router.use('/users', usersRoutes);
// router.use("/posts", isAuth, postsRoutes);
router.use('/services', servicesRoutes);

export default router;
