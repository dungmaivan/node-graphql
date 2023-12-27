import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { UseGuards } from '@nestjs/common';
import { Conversation } from './model/conversation.model';
import { CreateConversationDto } from './dto/create-consersation.dto';
import { CurrentUser } from 'src/lib/decorator/user.decorator.graphql';
import { JwtAuthGuard } from 'src/lib/guards/auth.gurad';

@Resolver('Conversation')
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => Conversation)
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Args('createConversation') createConversationData: CreateConversationDto,
    @CurrentUser() user,
  ) {
    const conversation = this.conversationService.createConversation(
      createConversationData,
      user._id,
    );
    return conversation;
  }
}
