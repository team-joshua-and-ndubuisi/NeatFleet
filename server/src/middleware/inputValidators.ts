import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

const first_nameValidator = body('first_name')
  .trim()
  .notEmpty()
  .escape()
  .withMessage('Please include a first name.');

const last_nameValidator = body('last_name')
  .trim()
  .notEmpty()
  .escape()
  .withMessage('Please include a last name.');

const emailValidator = body('email')
  .trim()
  .notEmpty()
  .isEmail()
  .withMessage('Please include a valid email.')
  .escape();

const passwordValidator = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters.');

const titleValidator = body('title')
  .trim()
  .notEmpty()
  .withMessage('Please include content.');

const contentValidator = body('content')
  .notEmpty()
  .withMessage('Please include content.');

const postIdValidator = param('postId')
  .isMongoId()
  .withMessage('Invalid post ID');

const userIdValidator = param('userId')
  .isMongoId()
  .withMessage('Invalid user ID');

const checkValidations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => {
        if (err.type === 'field') {
          return {
            field: err.path,
            message: err.msg,
          };
        }
        return {
          field: '',
          message: err.msg,
        };
      }),
    });
  }
  return next();
};

export {
  checkValidations,
  contentValidator,
  emailValidator,
  first_nameValidator,
  last_nameValidator,
  passwordValidator,
  postIdValidator,
  titleValidator,
  userIdValidator,
};
