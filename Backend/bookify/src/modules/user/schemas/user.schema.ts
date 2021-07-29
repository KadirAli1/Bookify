import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  sub: string;

  @Prop({ unieuqe: true, reuqired: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  city: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
