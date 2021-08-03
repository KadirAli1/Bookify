import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthAdmin } from '../../common/nestjs/decorators/auth-admin.decorator';
import { GetUser } from '../../common/nestjs/decorators/user.decorator';

import { ValidateAdmin } from '../../common/nestjs/interceptors/validate-admin.interceptor';
import { CreateFirebaseAccountDto } from '../auth/dto/create-firebase-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AdminsService } from './admins.service';
import { Admin } from './schema/admin.schema';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @AuthAdmin()
  async getAdmins(@GetUser() admin: Admin) {
    console.log(`Logged user: ${JSON.stringify(admin, null, 2)}`);
    const result = await this.adminsService.getAllAdmins();
    return result;
  }

  @Post()
  @UseInterceptors(ValidateAdmin)
  async createAdmin(@Body() createAdminDTO: CreateFirebaseAccountDto) {
    return await this.adminsService.createAdmin(createAdminDTO);
  }

  @Put('/:id')
  @UseInterceptors(ValidateAdmin)
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDto,
  ) {
    return await this.adminsService.updateAdmin(id, updateUserDTO);
  }
  @Delete(':id')
  @UseInterceptors(ValidateAdmin)
  deleteAdmin(@Param('id') id: string) {
    return this.adminsService.deleteAdmin(id);
  }
}
