import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
import { BookDTO } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BookController {
  constructor(private bookServices: BookService) {}

  @Get()
  async GetBooks() {
    return this.bookServices.getBooks();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    // @Param('book_id') book_id: string,
    @Body() body: BookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    var test = 1;
    return this.bookServices.uploadFile(body, file);
  }

  @Delete(':file_id')
  deleteFile(@Param('file_id') file_id: string): Promise<Book> {
    var test = 1;
    return this.bookServices.deleteFile(file_id);
  }
}
