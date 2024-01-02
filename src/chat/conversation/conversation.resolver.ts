import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { UseGuards } from '@nestjs/common';
import { Conversation } from './model/conversation.model';
import { CreateConversationDto } from './dto/createConsersation.dto';
import { CurrentUser } from 'src/lib/decorator/user.decorator.graphql';
import { JwtAuthGuard } from 'src/lib/guards/auth.gurad';
import { MessageModel } from './model/message.model';

@Resolver('Conversation')
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  @UseGuards(JwtAuthGuard)
  async getAllConversations(@CurrentUser() user) {
    const conversation = this.conversationService.getAllConversations(user.id);
    return conversation;
  }

  @Query(() => Conversation)
  @UseGuards(JwtAuthGuard)
  async getConversationById(@CurrentUser() user) {
    const conversation = this.conversationService.getConversationById(user.id);
    return conversation;
  }

  @Mutation(() => Conversation)
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Args('createConversation') createConversationData: CreateConversationDto,
    @CurrentUser() user,
  ) {
    const conversation = this.conversationService.createConversation(
      createConversationData,
      user.id,
    );
    return conversation;
  }

  @Mutation(() => MessageModel)
  @UseGuards(JwtAuthGuard)
  async deleteConversation(@CurrentUser() user) {
    return this.conversationService.deleteConversation(user.id);
  }
}
