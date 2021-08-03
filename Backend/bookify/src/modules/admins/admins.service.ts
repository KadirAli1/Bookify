import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateFirebaseAccountDto } from '../auth/dto/create-firebase-user.dto';
import { UpdateAdminDTO } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private authService: AuthService,
  ) {}

  async createAdmin(
    createAdminDTO: CreateFirebaseAccountDto,
  ): Promise<boolean> {
    const { email, name, surname, password } = createAdminDTO;

    const firebaseUser = await this.authService.createAdminAccount(
      email,
      password,
      name,
    );
    try {
      await this.adminModel.create({
        email,
        name,
        surname,
        sub: firebaseUser.uid,
      });
    } catch (e) {
      await this.authService.deleteFiebasAccount(firebaseUser.uid);
      throw new HttpException(
        "Couldn't create a new user account on DB!",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return true;
  }
  async updateAdmin(id: string, updateAdminDto: UpdateAdminDTO) {
    const { name } = updateAdminDto;

    const result = await this.adminModel.findByIdAndUpdate(id, { name });

    if (!result) return false;
    return true;
  }

  async getAllAdmins(): Promise<Admin[]> {
    try {
      const result = await this.adminModel.find();
      return result;
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }
  async deleteAdmin(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id);
    await this.authService.deleteFiebasAccount(admin.sub);
    admin.delete();
    return await this.adminModel.findByIdAndRemove(id);
  }
}
