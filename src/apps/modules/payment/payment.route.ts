import { Router } from 'express';
import { PaymentControllers } from './payment.controller';
import { authenticate, authorize } from '../../middlewares/authenticate';
import { AUTH_ROLE } from '../auth/auth.constant';

const router = Router();

router.post(
  '/checkout',
  authenticate,
  authorize(AUTH_ROLE.user),
  PaymentControllers.makePayment,
);
router.post('/confirmation', PaymentControllers.confirmPayment);

export const PaymentRoutes = router;
