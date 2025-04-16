import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUser();

  sendResponse(res, {
    message: 'User Get successfully',
    data: result,
  });
});

export const UserControllers = {
  getUser,
};
