import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate } from 'class-validator';
import { Auth } from 'src/auth/schema/auth.shema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Conversation {
  @Prop()
  content: string;

  @Prop()
  senderId: string;

  @Prop()
  @IsDate()
  createAt: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Auth' })
  member: Auth[];
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
