import { Injectable, InjectModel } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // private readonly logger: Logger,
  ) {}

  async getBooks() {
    return await this.bookModel.find();
  }
}
//CHANGes
