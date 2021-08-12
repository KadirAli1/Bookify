import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { BookDTO } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import _ from 'underscore';
import { unlink } from 'fs/promises';

import { Http } from 'winston/lib/winston/transports';
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

  // async getBookOwners(user: UserDocument, book_id) {
  //   await this.UserIsBookOwner(user, book_id);

  //   const book = await this.bookModel
  //     .findOne(
  //       {
  //         _id: book_id,
  //         owners: { $elemMatch: { user: user._id } },
  //       },
  //       'owners',
  //     )
  //     .lean()
  //     .populate({
  //       path: 'owners.user',
  //       model: User.name,
  //       select: '_id name email',
  //     });
  //   if (!book) throw new HttpException('Error 404', HttpStatus.NOT_FOUND);
  //   return book.owners;
  // }

  // async acceptUserRequest(user: UserDocument, book_id: string) {
  //   const session = await this.bookModel.db.startSession();
  //   session.startTransaction();

  //   try{
  //     const {nModified} = await this.bookModel.updateOne({
  //       _id: book_id,

  //     })

  //   }catch(err){}
  // }

  //Delete book
  async deleteFile(book_id: string): Promise<Book> {
    //1st step: get the ID of the book we want to delete
    //2nd step: find the document of that book from DB
    const book = await this.bookModel.findById(book_id);

    //3rd step: using the URL that we get from the document of the book with the given ID, try to delete that file from the folder
    try {
      await unlink(book.url);
      console.log(`successfully deleted ${book.url}`);
      return await this.bookModel.findByIdAndRemove(book_id);
    } catch (error) {
      console.error('there was an error:', error.message);
    }
    //4th step: if 3rd step successful! -> Remove the document with the given ID from the DB
  }

  // async UserIsBookOwner(user: UserDocument, book_id: string): Promise<boolean> {
  //   const isOwner = user.owner_of.some(
  //     (book) => book._id.toString() == book_id,
  //   );

  //   if (!isOwner) throw new HttpException('Error 404 ', HttpStatus.NOT_FOUND);

  //   return isOwner;
  // }
}
