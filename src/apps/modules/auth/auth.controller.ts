import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { TAuthUser } from '../../interface/common';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    message: 'User create successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.body);

  sendResponse(res, {
    message: 'Please check your email',
    data: '',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  await AuthServices.resetPassword(req.body);

  sendResponse(res, {
    message: 'Please login again',
    data: '',
  });
});

const getUser = catchAsync(async (req, res) => {
  const user = req?.user as TAuthUser;
  const result = await AuthServices.getUserIntoDB(user?.email as string);

  sendResponse(res, {
    message: 'Get user successfully',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
  getUser,
};
