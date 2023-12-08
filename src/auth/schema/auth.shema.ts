import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  boss = 'boss',
  employee = 'employee',
}
@Schema({
  timestamps: true,
})
export class Auth extends Document {
  @Prop()
  role: Role;

  @Prop()
  username: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
