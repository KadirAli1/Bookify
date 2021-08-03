import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminGuard } from '../guards/auth.admin.guard';
import { ValidateAdmin } from '../interceptors/validate-admin.interceptor';

export function AuthAdmin() {
  return applyDecorators(UseGuards(AdminGuard), UseInterceptors(ValidateAdmin));
}
