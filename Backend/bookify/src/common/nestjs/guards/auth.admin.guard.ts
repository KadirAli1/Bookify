import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES } from '../../enums';
import { FirebaseUser } from '../../types';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { firebase_user } = request;
    return this.validateAdmin(firebase_user);
  }

  async validateAdmin(firebase_user: FirebaseUser) {
    if (!firebase_user) return false;
    if (!firebase_user.id) return false;
    if (firebase_user.role == ROLES.ADMIN) return true;
    return false;
  }
}
