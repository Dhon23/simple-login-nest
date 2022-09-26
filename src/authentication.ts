import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './helpers/jwt';
import { errorHandler } from './middlewares/errorHandler';

@Injectable()
export class Authentication implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw { code: 2 };
      }
      const decodedToken: any = verifyToken(authorization.split(' ')[1]);

      req.headers.user = decodedToken;
      next();
    } catch (error) {
      errorHandler(error);
    }
  }
}
