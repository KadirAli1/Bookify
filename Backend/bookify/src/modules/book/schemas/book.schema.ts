import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  owner: string;

  @Prop()
  year_of_publish: string;
}

export const userSchem = SchemaFactory.createForClass(Book);
