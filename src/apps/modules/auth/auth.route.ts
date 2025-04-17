import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post('/forget-password', AuthControllers.forgetPassword);
router.post('/reset-password', AuthControllers.resetPassword);

router.get('/me', authenticate, AuthControllers.getUser);

export const AuthRouters = router;
