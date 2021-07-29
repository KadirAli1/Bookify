import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  city: string;
}
