import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthUser } from 'src/common/nestjs/decorators/auth-user.decorator';
import { GetUser } from 'src/common/nestjs/decorators/user.decorator';
import { CreateFirebaseAccountDto } from '../auth/dto/create-firebase-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Controller('users')
export class UserController {
  userService: any;
  @Get('email/:email')
  // @AuthUser()
  async getUserByEmail(@Param('email') email: string) {
    return await this.getUserByEmail(email);
  }

  @Get()
  // @AuthUser()
  async getUserDetalis(@GetUser() user: UserDocument) {
    const testUser = await user.populate('owner_of', 'name').execPopulate();
    return testUser;
  }

  @Get(':sub')
  async getUserBySUB(@Param('sub') sub: string) {
    return await this.userService.getUserBySUB(sub);
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateFirebaseAccountDto) {
    return await this.userService.createUser(createUserDTO);
  }

  @Put('/:sub')
  async updateUser(
    @Param('sub') sub: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(sub, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
