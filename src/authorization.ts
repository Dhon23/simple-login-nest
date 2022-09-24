import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middlewares/errorHandler';

@Injectable()
export class Authorization implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedToken: any = req.headers.user;
      const { role } = decodedToken;

      if (role !== 'staff') throw { code: 4 };
      next();
    } catch (error) {
      errorHandler(error);
    }
  }
}
