import { file } from '@babel/types';
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

const fs = require('fs');
const path = require('path');

@Injectable()
export class BookService {
  uploadFile1() {
    throw new Error('Method not implemented.');
  }
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

  async uploadFile(updateBookDTO: BookDTO, file: Express.Multer.File) {
    let baseDir = path.join(process.env.PWD, '/files/');
    // fs.open(`${baseDir}+result.txt`, 'wx', (err, desc) => {
    //   if (!err && desc) {
    //     fs.writeFile(desc, 'sample data', (err) => {
    //       // Rest of your code

    //       if (err) throw err;
    //       console.log('Results Received');
    //     });
    //   }
    // });
    fs.writeFile(baseDir + file.originalname, file.buffer, (writeFileError) => {
      if (writeFileError) {
        return;
      }
    });
    return true;
  }

  async saveFileDataToDB(bookDTO: BookDTO) {
    var fs = require('fs');
    fs.readFile('text.js');
  }

  //Delete book
  async deleteBook(id: string): Promise<Book> {
    //delete path from
    var fs = require('fs');
    fs.unlink(id, function (err) {
      // console.log('deleted', id);
    });
    //delete file from
    return await this.bookModel.findByIdAndDelete(id);
  }
}
