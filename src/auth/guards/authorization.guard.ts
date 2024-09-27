import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { env } from 'src/config/env';
import { IPayload } from '../models/payload.model';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      return false;
    }

    try {
      const { payload } = this.jwtService.verify<IPayload>(token, {
        secret: env.JWT_SECRET,
      });

      if (requiredRoles && requiredRoles.length > 0) {
        const userRoles = payload.role;
        const hasRole = requiredRoles.some((role) => userRoles.includes(role));
        if (!hasRole) {
          throw new UnauthorizedException();
        }
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(request: Request): string {
    const authorizationHeader = request.headers['authorization'];
    return authorizationHeader?.split(' ')[1];
  }
}
