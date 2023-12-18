import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/schema/auth.shema';
import { IsDate } from 'class-validator';

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  completed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  userId: Auth;

  @Prop()
  @IsDate()
  endDate: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
