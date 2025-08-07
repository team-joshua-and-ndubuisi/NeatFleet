import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User as UserType } from '../../generated/prisma';
import { logger } from '../config/logger';
import prisma from '../config/prisma';
import issueJWT from '../lib/issueJWT';
import { createUser, getUserProfile } from '../services/userService';
import { ExtendedErrorT } from '../types/error';
import { AuthedUser } from '../types';
import { calculateYears } from '../utils/dateUtils';
import { numOfCompletedBookings } from '../services/bookingService';
import { getTechnicianProfile } from '../services/technicianService';
const User = prisma.user;

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(
  async (
    req: Request<unknown, unknown, UserType>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { first_name, last_name, email, password, phone } = req.body;
    logger.info('Attempting to register user', {
      first_name,
      last_name,
      email,
    });

    const userExists = await User.findUnique({ where: { email } });

    if (userExists) {
      logger.warn(
        `${first_name} ${last_name} is already registered with email ${email}`
      );
      const error: ExtendedErrorT = new Error('User already exists');
      error.statusCode = 400;
      next(error);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUser({
      first_name: first_name,
      last_name: last_name,
      email,
      phone,
      password: hashedPassword,
    });

    if (!user) {
      logger.error(`Registration failed for ${first_name} ${last_name}`);
      const error: ExtendedErrorT = new Error('User registration failed');
      error.statusCode = 400;
      next(error);
      return;
    }

    const tokenData = issueJWT(user);

    logger.info(`${first_name} ${last_name} has been successfully registered`);

    res.status(201).json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token: tokenData.token,
      expiresIn: tokenData.expiresIn,
    });
  }
);

// @desc    Login user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    logger.info(`Attempting to login user with ${email}...`);

    const user = await User.findUnique({ where: { email } });

    if (!user) {
      logger.warn(`No user exists with email ${email}`);
      const error: ExtendedErrorT = new Error('No user exists with that email');
      error.statusCode = 404;
      next(error);
      return;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      logger.warn(`Incorrect password for user ${email}`);
      const error: ExtendedErrorT = new Error(
        'Incorrect password, please try again'
      );
      error.statusCode = 401;
      next(error);
      return;
    }

    const tokenData = issueJWT(user);

    logger.info(`${user.first_name} ${user.last_name} has been logged in`);

    res.status(200).json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      token: tokenData.token,
      expiresIn: tokenData.expiresIn,
    });
  }
);

// @desc    Get user profile
// @route   GET /profile
// @access  Private
const userProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req.user as AuthedUser).id;
    const userRole = (req.user as AuthedUser).role;

    const profile =
      userRole === 'technician'
        ? await getTechnicianProfile(userId)
        : await getUserProfile(userId);

    res.status(200).json(profile);
  }
);

// @desc    Edit user profile
// @route   PUT /profile
// @access  Private
const editProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      const error: ExtendedErrorT = new Error('User not authenticated');
      error.statusCode = 401;
      next(error);
      return;
    }

    const userId = (req.user as UserType).id;

    const { first_name, last_name, email, currentPassword, newPassword } =
      req.body;

    const user = await User.findUnique({
      where: { id: userId },
    });

    if (!user) {
      logger.warn(`No user found with id ${userId}`);
      const error: ExtendedErrorT = new Error('No user found');
      error.statusCode = 404;
      next(error);
      return;
    }

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;

    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        const error: ExtendedErrorT = new Error(
          'Both currentPassword and newPassword are required to change password'
        );
        error.statusCode = 400;
        next(error);
        return;
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        const error: ExtendedErrorT = new Error(
          'Current password is incorrect'
        );
        error.statusCode = 401;
        next(error);
        return;
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await User.update({
      where: { id: userId },
      data: {
        ...user,
      },
    });

    logger.info(`User profile updated for id ${userId}`);

    res.status(200).json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      message: 'Profile updated successfully',
    });
  }
);

// @desc    Delete user profile
// @route   DELETE /profile
// @access  Private
const deleteProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req.user as UserType).id;

    const user = await User.findUnique({
      where: { id: userId },
    });

    if (!user) {
      logger.warn(`No user found with id ${userId}`);
      const error: ExtendedErrorT = new Error('No user found');
      error.statusCode = 404;
      next(error);
      return;
    }

    await User.delete({ where: { id: userId } });

    logger.info(`User deleted with id ${userId}`);

    res.status(200).json({ message: 'User deleted successfully' });
  }
);

export { deleteProfile, editProfile, loginUser, registerUser, userProfile };
