import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //@ts-expect-error isAdmin is a boolean on the user object
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  next();
};

export { isAdmin, isAuth };
