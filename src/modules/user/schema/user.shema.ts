import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  boss = 'boss',
  employee = 'employee',
}
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  role: Role;

  @Prop()
  username: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  active: boolean;

  @Prop()
  IsPremium: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
