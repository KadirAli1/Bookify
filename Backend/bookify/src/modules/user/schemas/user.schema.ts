import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book, BookDocument } from 'src/modules/book/schemas/book.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  sub: string;

  @Prop({ unieuqe: true, reuqired: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Book.name }] })
  owner_of: BookDocument[];

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  city: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
