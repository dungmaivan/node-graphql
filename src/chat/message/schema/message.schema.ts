import { Prop, Schema } from '@nestjs/mongoose';
import { IsDate } from 'class-validator';

@Schema({
  timestamps: true,
})
export class MessageSchema {
  @Prop()
  content: string;

  @Prop()
  senderId: string;

  @Prop()
  conversationId: string;

  @Prop()
  @IsDate()
  createAt: Date;
}
