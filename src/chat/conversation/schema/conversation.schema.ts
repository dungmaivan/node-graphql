import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/modules/user/schema/user.shema';

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
  member: User[];
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
