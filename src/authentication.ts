import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './helpers/jwt';
import { errorHandler } from './middlewares/errorHandler';

@Injectable()
export class Authentication implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token } = req.headers;
      if (!access_token) {
        throw { code: 2 };
      }
      const decodedToken: any = verifyToken(access_token);
      
      req.headers.user = decodedToken;
      next();
    } catch (error) {
      errorHandler(error);
    }
  }
}
