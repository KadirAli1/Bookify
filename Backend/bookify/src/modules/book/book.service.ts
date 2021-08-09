import { file } from '@babel/types';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { BookDTO } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

const fs = require('fs');
const path = require('path');
// var tags: Array<String>;
const tags = [
  'IT',
  'Algoritham',
  'Math',
  'OS',
  'Drama',
  'History',
  'Autobiography',
  'Fantasy',
  'Horror',
  'Romance',
  '',
];

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

  async uploadFile(
    // book_id: string,
    updateBookDTO: BookDTO,
    file: Express.Multer.File,
  ) {
    try {
      let { title, author, year_of_publish, owner } = updateBookDTO;

      let baseDir = path.join(process.env.PWD, '/files/');
      let filePath = baseDir + file.originalname;
      fs.writeFile(filePath, file.buffer, (writeFileError) => {
        if (writeFileError) {
          return;
        }
      });

      //DB
      const result = await this.bookModel.create({
        title,
        author,
        url: filePath,
        year_of_publish,
      });

      return result;
    } catch (err) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
  }

  async saveFileDataToDB(bookDTO: BookDTO) {
    var fs = require('fs');
    fs.readFile('text.js');
  }

  //Delete book
  async deleteFile(file_id: string): Promise<Book> {
    //delete path from

    // fs.unlink(file_id, function (err) {
    // console.log('deleted', id);
    // });
    //delete file from
    return await this.bookModel.findByIdAndRemove(file_id);
  }
}
