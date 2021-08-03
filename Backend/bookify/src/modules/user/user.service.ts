import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateFirebaseAccountDto } from '../auth/dto/create-firebase-user.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
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
  async getUserBySUB(sub: string): Promise<UserDocument> {
    const _user = await this.userModel.findOne({
      sub: sub,
    });
    return _user;
  }

  //  Create a new User in Firebase and in the DB collection
  async createUser(createUserDTO: CreateFirebaseAccountDto): Promise<boolean> {
    const { email, password, name, surname } = createUserDTO;

    const firebaseUser = await this.authService.createFirebaseAccount(
      email,
      password,
      name,
    );
    try {
      await this.userModel.create({
        email,
        name,
        surname,
        sub: firebaseUser.uid,
      });
      return true;
    } catch (e) {
      await this.authService.deleteFiebasAccount(firebaseUser.uid);
      throw new HttpException(
        "Couldn't create a new useraccount on DB!",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async updateUser(sub: string, updateUserDto: UpdateUserDto) {
    const { name, surname, city } = updateUserDto;

    const result = await this.userModel.findOneAndUpdate({
      name,
      surname,
      city,
    });
    if (!result) return false;
    return true;
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
