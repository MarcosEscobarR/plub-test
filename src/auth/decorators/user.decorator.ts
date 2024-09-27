import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { IPayload } from '../models/payload.model';

export const UserId = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToRpc().getData();
    const token = extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const { payload } = new JwtService({
      secret: env.JWT_SECRET,
    }).verify<IPayload>(token);

    return payload.id;
  },
);

function extractTokenFromRequest(request: Request): string {
  const authorizationHeader = request.headers['authorization'];
  return authorizationHeader?.split(' ')[1];
}
