import { HttpException } from '@nestjs/common';

export const errorHandler = (error: {
  errors: any;
  code: number;
  name: string;
}) => {
  // console.log(error);
  if (error.name === 'ValidationError') {
    let message: string;
    Object.keys(error.errors).forEach((key) => {
      message = error.errors[key].message;
    });
    throw new HttpException(message, 400);
  }
  if (error.name === 'JsonWebTokenError') error.code = 3;
  if (error.code) {
    const errList: object = {
      1: [401, 'Invalid email or password'],
      2: [401, 'You are not authenticated'],
      3: [400, 'Invalid Token'],
      4: [403, 'You are not authorized'],
      5: [400, 'Please wait until your account approved'],
      6: [400, 'Your account is rejected'],
      7: [400, 'Email is required'],
      8: [400, 'Password is required'],
      11000: [400, 'Email already exist'],
    };
    const [status, message] = errList[error.code];
    throw new HttpException(message, status);
  }
};
