import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookServices: BookService) {}

  @Get()
  async GetBooks() {
    return this.bookServices.getBooks();
  }
}
