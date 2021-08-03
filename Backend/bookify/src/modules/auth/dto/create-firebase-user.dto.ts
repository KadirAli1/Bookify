import { IsEmail, IsString } from 'class-validator';

export class CreateFirebaseAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  password: string;
}
