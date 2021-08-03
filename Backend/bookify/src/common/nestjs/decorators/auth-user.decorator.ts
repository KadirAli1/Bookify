import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserGuard } from '../guards/auth.user.guard';
import { ValidateUser } from '../interceptors/validate-user.interceptor';

export function AuthUser() {
  return applyDecorators(UseGuards(UserGuard), UseInterceptors(ValidateUser));
}
