import passport from '../utils/passport';

export const authenticate = passport.authenticate('jwt', { session: false });
