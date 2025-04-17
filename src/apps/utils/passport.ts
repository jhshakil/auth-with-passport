import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_access_secret as string,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload) {
      return done(null, jwt_payload);
    } else {
      return done(null, false);
    }
  }),
);

export default passport;
