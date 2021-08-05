import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import * as mongoose from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: string;

  @Prop()
  year_of_publish: string;

  @Prop()
  author: string;

  @Prop()
  tags: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
