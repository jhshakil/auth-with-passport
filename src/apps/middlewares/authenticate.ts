import { NextFunction, Request, Response } from 'express';
import passport from '../utils/passport';
import { TRole } from '../modules/auth/auth.interface';
import { TAuthUser } from '../interface/common';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

// Authenticate any logged-in user
export const authenticate = passport.authenticate('jwt', { session: false });

// Check if user has required role
export const authorize = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as TAuthUser;
    if (!user || !requiredRoles.includes(user.role as TRole)) {
      throw new AppError(httpStatus.FORBIDDEN, 'Forbidden: insufficient role');
    }

    next();
  });
};
