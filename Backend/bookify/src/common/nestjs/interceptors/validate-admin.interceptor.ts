import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import {
  Admin,
  AdminDocument,
} from '../../../modules/admins/schema/admin.schema';
import { FirebaseUser } from '../../types';

@Injectable()
export class ValidateAdmin implements NestInterceptor {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const firebase_user: FirebaseUser = request.firebase_user;

    const user = await this.adminModel.findOne({ sub: firebase_user.id });
    if (user) {
      //if result == true we have validated jwtToken and we have found a user in our DB that matches the firebase user.
      request.user = user;
    } else {
      console.log('No user with the given id Token was found!');
      throw new HttpException('Error 401', HttpStatus.UNAUTHORIZED);
    }

    return next.handle();
  }
}
