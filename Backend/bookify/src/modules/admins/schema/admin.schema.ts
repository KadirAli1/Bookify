import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ unique: true, required: true })
  sub: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  name: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
