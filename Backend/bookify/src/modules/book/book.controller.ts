import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/common/nestjs/decorators/auth-user.decorator';
import { GetUser } from 'src/common/nestjs/decorators/user.decorator';
import { UserDocument } from '../user/schemas/user.schema';
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
  @AuthUser()
  uploadFile(
    @GetUser() user: UserDocument,
    @Body() body: BookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookServices.uploadFile(user, body, file);
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // @AuthUser()
  // uploadFile(
  //   // @GetUser() user: UserDocument,
  //   @Body() body: BookDTO,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.bookServices.uploadFile(body, file);
  // }

  @Delete(':book_id')
  @AuthUser()
  deleteFile(
    @GetUser() user: UserDocument,
    @Param('book_id') book_id: string,
  ): Promise<Book> {
    return this.bookServices.deleteFile(user, book_id);
  }
}
