/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  authId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Auth',
  },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const User = model<TUser>('User', userSchema);
