import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/modules/admins/schema/admin.schema';
import { User, UserSchema } from 'src/modules/user/schemas/user.schema';
import { AuthService } from './auth.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
