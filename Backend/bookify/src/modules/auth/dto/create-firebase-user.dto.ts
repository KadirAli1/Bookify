export class CreateFirebaseAccountDto {
  @IsEmail()
  email: string;
  name: string;
  username: string;
  password: string;
}
