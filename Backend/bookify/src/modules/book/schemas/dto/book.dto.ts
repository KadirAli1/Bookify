import { IsOptional, isString, IsString } from 'class-validator';

export class Book {
  @IsString()
  title: string;

  @IsString()
  owner: string;

  @IsString()
  @IsOptional()
  year_of_publish: string;
}
