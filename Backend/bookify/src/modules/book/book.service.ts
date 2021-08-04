import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { BookDTO } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger,
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

  async uploadFile(updateBookDTO: BookDTO) {
    const fs = require('fs');
    const path = require('path');

    let baseDir = path.join(__dirname, '/./niktoResults/');
    fs.open(`${baseDir}+result.txt`, 'wx', (err, desc) => {
      if (!err && desc) {
        fs.writeFile(desc, 'sample data', (err) => {
          // Rest of your code
          if (err) throw err;
          console.log('Results Received');
        });
      }
    });
  }

  async saveFileDataToDB(bookDTO: BookDTO) {}

  //Delete book from
  async deleteBook(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
