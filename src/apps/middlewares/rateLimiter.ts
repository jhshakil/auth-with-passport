import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // max 100 requests per IP
  message: 'Too many requests from this IP, please try again later.',
});
