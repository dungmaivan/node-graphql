import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/auth/schema/auth.shema';
import { ConversationSchema } from './schema/conversation.schema';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
      {
        name: 'Conversation',
        schema: ConversationSchema,
      },
    ]),
  ],
  providers: [ConversationService, ConversationResolver],
})
export class ConvarsationModule {}
