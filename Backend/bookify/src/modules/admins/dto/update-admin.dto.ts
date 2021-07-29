import { IsString } from 'class-validator';

export class UpdateAdminDTO {
  @IsString()
  name: string;
}
