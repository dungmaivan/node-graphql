import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema } from './schema/conversation.schema';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { UserSchema } from 'src/modules/user/schema/user.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      {
        name: 'Conversation',
        schema: ConversationSchema,
      },
    ]),
  ],
  providers: [ConversationService, ConversationResolver],
})
export class ConvarsationModule {}
