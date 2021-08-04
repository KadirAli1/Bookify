import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { BookDTO } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,  private readonly logger: Logger,
  ) {}

  async getBooks() {
    return await this.bookModel.find();
  }

  async updateBooks(id: string, updateBookDTO: BookDTO) {
    //Check if the sender of the request is existing OWNER of a book

    const result = await this.bookModel.findByIdAndUpdate(id, updateBookDTO);
    if (!result) return false;
    return true;
  }

}
