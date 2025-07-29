import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { logger } from '../config/logger';
import prisma from '../config/prisma';
import { ExtendedErrorT } from '../types/error';

const User = prisma.user;

// @desc    Search users
// @route   GET /search
// @access  Private
const searchUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { query } = req.query;
    const { first_name, last_name, email, page, limit } = req.query;

    if (!req.query || (!first_name && !last_name && !email)) {
      const error: ExtendedErrorT = new Error('Search query is required');
      error.statusCode = 400;
      return next(error);
    }

    const targetfirst_name = first_name ? String(first_name) : '';
    const targetlast_name = last_name ? String(last_name) : '';
    const targetEmail = email ? String(email) : '';

    const currentPage = isNaN(Number(page)) ? 1 : Number(page);
    const queryLimit = isNaN(Number(limit)) ? 10 : Number(limit);

    const users = await User.findMany({
      orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }],
      skip: (currentPage - 1) * queryLimit,
      take: queryLimit,
      where: {
        OR: [
          { first_name: { contains: targetfirst_name, mode: 'insensitive' } },
          { last_name: { contains: targetlast_name, mode: 'insensitive' } },
          { email: { contains: targetEmail, mode: 'insensitive' } },
        ],
      },
    });
    // orderBy({ last_name: "asc", first_name: "asc" })
    //   .skip((page - 1) * limit)
    //   .take(limit);

    res.status(200).json({ users });
  }
);

// @desc    Read all users
// @route   GET /users
// @access  Private
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findMany();
  res.status(200).json({ users });
});

// @desc    Read a single user
// @route   GET /users/:userId
// @access  Private
const getSingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await User.findUnique({
      where: { id: userId },
    });

    if (!user) {
      logger.warn(`User not found with id ${req.params.userId}`);
      const error: ExtendedErrorT = new Error('No user found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ user });
  }
);

export { getSingleUser, getUsers, searchUsers };
