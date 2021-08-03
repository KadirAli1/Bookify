import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseUser } from '../../types';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { firebase_user } = request;
    return this.validateUser(firebase_user);
  }

  async validateUser(firebase_user: FirebaseUser) {
    if (!firebase_user) return false;
    if (!firebase_user.id) return false;
    return true;
  }
}
