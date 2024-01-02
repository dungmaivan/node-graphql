import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Message extends Document {
  @Prop()
  content: string;

  @Prop()
  senderId: string;

  @Prop()
  conversationId: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
