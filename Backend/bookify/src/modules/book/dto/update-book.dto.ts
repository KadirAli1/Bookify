import { IsArray, IsOptional, IsString } from 'class-validator';

export class BookDTO {
  @IsString()
  title: string;

  // @IsString()
  // owner: string;

  @IsString()
  @IsOptional()
  year_of_publish: string;

  // @IsArray()
  // tags: string[];

  @IsString()
  author: string;

  // fileSelected: Express.Multer.File;
  file: Express.Multer.File;
}
