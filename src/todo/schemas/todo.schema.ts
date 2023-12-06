import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from 'src/auth/schemas/auth.schema';

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
  user: Auth;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
