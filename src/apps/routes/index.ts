import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AuthRouters } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/user',
    route: UserRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
