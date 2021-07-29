import {
  HttpException,
  HttpStatus,
  Injectable,
  InjectModel,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // private authService: AuthSerivce
  ) {}

  async getUSerByEmail(email: string) {
    const user = await this.userModel.findOne(
      {
        email: email,
        verified: true,
      },
      { name: 1 },
    );
    if (!user) {
      throw new HttpException(
        " Couldn't find a user with the given email address!",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return user;
  }
}
