import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '@app/types/express-request.interface';
import { verify } from 'jsonwebtoken';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  private readonly JWT_SECRET = process.env.JWT_SECRET;

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ').pop();

    try {
      const decode = verify(token, this.JWT_SECRET);
      req.user = await this.userService.findById(decode.id);
    } catch (err) {
      req.user = null;
    } finally {
      next();
    }
  }
}
