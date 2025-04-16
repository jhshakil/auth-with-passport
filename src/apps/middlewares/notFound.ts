import { RequestHandler } from 'express';
import httpStatus from 'http-status';

const notFound: RequestHandler = (req, res, next) => {
  const error = new Error('Not Found');
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: error.message,
    error: '',
  });
  next(error);
};

export default notFound;
