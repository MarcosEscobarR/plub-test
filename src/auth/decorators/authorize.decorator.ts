import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { Role } from 'src/commons/enums/roles';

export function Authorize(roles?: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthorizationGuard),
  );
}
