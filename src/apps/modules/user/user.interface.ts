/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export type TUser = {
  authId: Types.ObjectId;
  email: string;
  name: string;
  transactionId: string;
  isDeleted: boolean;
};
