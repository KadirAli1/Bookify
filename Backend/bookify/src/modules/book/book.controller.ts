import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
import { BookDTO } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private bookServices: BookService) {}

  @Get()
  async GetBooks() {
    return this.bookServices.getBooks();
  }
  //Diskutim me Egzonin!
  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('files'))
  // // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   console.log(files);
  // }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(@Body() body: BookDTO, @UploadedFile() file: Express.Multer.File) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
