import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.getUserByEmail(email);
  }
}
